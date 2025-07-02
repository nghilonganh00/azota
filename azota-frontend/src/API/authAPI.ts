import { AxiosResponse } from "axios";
import { axiosInstance } from "../services/axiosInstance";

const accessToken = localStorage.getItem("accessToken");

const AuthAPI = {
  register: async (username: string, password: string, userFullName: string, userRole: string) => {
    try {
      const requestData = {
        username,
        password,
        fullname: userFullName,
        role: userRole,
      };

      const url = "auth/signup";

      const response = await axiosInstance.post(url, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.log("Error in register of AuthAPI: " + error);
    }
  },
  login: async (username: string, password: string): Promise<AxiosResponse | null> => {
    try {
      const requestData = {
        username,
        password,
      };

      const response = await axiosInstance.post("auth/login", requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      console.log("Error in login of AuthAPI: ", error);
      return null;
    }
  },
  logout: async (): Promise<AxiosResponse | null> => {
    try {
      const response = await axiosInstance.post(
        "auth/logout",
        {},
        {
        },
      );

      return response;
    } catch (error) {
      console.log("Error in login of AuthAPI: ", error);
      return null;
    }
  },

  generateLoginQRCode: async (): Promise<AxiosResponse | null> => {
    try {
      const url = "auth/generate-login-qr";

      const response = await axiosInstance.post(url, {}, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `${accessToken}`,
          },
        },
      );

      return response;
    } catch (error) {
      return null;
    }
  },
  approveLoginQrCode: async (sessionId: string): Promise<AxiosResponse | null> => {
    try {
      const url = "auth/approve-login-qr";

      const response = await axiosInstance.post(url, {
        sessionId: sessionId,
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      return null;
    }
  },
  checkLoginQrApproval: async (sessionId: string): Promise<AxiosResponse | null> => {
    try {
      const url = "auth/check-qr-login-approval";

      const response = await axiosInstance.post(url, {
        sessionId: sessionId,
      }, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      return null;
    }
  },
};

export default AuthAPI;
