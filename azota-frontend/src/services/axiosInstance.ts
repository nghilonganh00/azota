import axios, { AxiosError,  AxiosResponse, InternalAxiosRequestConfig } from "axios";

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

let isRefreshing = false;
let failedRequestsQueue: any[] = [];

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
});

const getAccessToken = () => localStorage.getItem("accessToken");

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = getAccessToken();

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest._retry) {
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

      return new Promise((resolve, reject) => {
        axiosInstance
          .post("http://localhost:8080/api/auth/refresh-token", {}, { withCredentials: true })
          .then(({ data }) => {
            localStorage.setItem("accessToken", data.accessToken);
            axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${data.accessToken}`;
            originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
            failedRequestsQueue.forEach((request) => request.resolve(data.accessToken));
            failedRequestsQueue = [];
            resolve(axiosInstance(originalRequest));
          })
          .catch((err) => {
            failedRequestsQueue.forEach((request) => request.reject(err));
            failedRequestsQueue = [];
            localStorage.removeItem("accessToken");
            // window.location.href = "/auth/login";
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }
  },
);
