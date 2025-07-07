import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { APIErrorReponse } from "../Globals/Interfaces/interface";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let failedRequestsQueue: any[] = [];

const token = localStorage.getItem("accessToken");

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
});

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401) {
      console.log("error.response", error.response);
      const errorData = error.response.data as APIErrorReponse | undefined;
      const errorType = errorData?.error;

      if (errorType === "TOKEN_MISSING") {
        window.location.href = "/auth/login";
        return Promise.reject(error);
      }

      if (errorType === "TOKEN_EXPIRED" && !originalRequest._retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedRequestsQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers["Authorization"] = `Bearer ${token}`;
              return axiosInstance(originalRequest);
            })
            .catch((err) => Promise.reject(err));
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const { data } = await axios.post(`auth/refresh-token`, {}, { withCredentials: true });

          localStorage.setItem("accessToken", data.accessToken);
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
          originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;

          failedRequestsQueue.forEach((request) => request.resolve(data.accessToken));
          failedRequestsQueue = [];

          return axiosInstance(originalRequest);
        } catch (err) {
          failedRequestsQueue.forEach((request) => request.reject(err));
          failedRequestsQueue = [];
          localStorage.removeItem("accessToken");
          window.location.href = "/auth/login";
          console.error("Error refreshing token:", err);
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  },
);
