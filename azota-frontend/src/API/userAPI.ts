import { AxiosResponse } from "axios";
import { axiosInstance } from "../services/axiosInstance";

const accessToken = localStorage.getItem("accessToken");

const UserAPI = {
  getInfo: async (): Promise<AxiosResponse | null> => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.warn("No access token, skipping user info fetch");
      return null;
    }
    
    try {
      const response = await axiosInstance.get("users", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      console.error("Error in removeTeacherRole of UserAPI: ", error);
      return null;
    }
  },
  removeTeacherRole: async (): Promise<Response> => {
    try {
      if (!accessToken) {
        console.error("Access Token isn't in LocalStorage");
        return new Response(null, { status: 401, statusText: "Unauthorized" });
      }

      const url = new URL(`http://localhost:8080/api/users/remove-teacher-role`);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.log("Error in removeTeacherRole of UserAPI: ", error);
      return new Response(null, {
        status: 500,
        statusText: "Internal Server Error",
      });
    }
  },
  registerTeacherRole: async (): Promise<Response> => {
    try {
      if (!accessToken) {
        console.error("Access Token isn't in LocalStorage");
        return new Response(null, {
          status: 401,
          statusText: "Unauthorized",
        });
      }

      const url = new URL(`http://localhost:8080/api/user/register-teacher-role`);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });

      return response;
    } catch (error) {
      console.error("Error in registerTeacherRole of UserAPI: ", error);
      return new Response(null, {
        status: 500,
        statusText: "Internal Server Error",
      });
    }
  },
  createAnonymous: async (fullName: string) => {
    try {
      const url = new URL(`http://localhost:8080/api/user/anonymous`);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName: fullName }),
      });

      return response;
    } catch (error) {
      console.error("Error in createAnonymous of UserAPI: ", error);
      return {};
    }
  },
  updateUser: async (
    fullName: string,
    DOB: string,
    email: string,
    phone: string,
    gender: string,
    avatarURL: string,
  ): Promise<AxiosResponse | null> => {
    try {
      const response = await axiosInstance.patch("users", { fullName, DOB, email, phone, gender, avatarURL });

      return response;
    } catch (error) {
      console.error("Error in update of UserAPI: ", error);
      return null;
    }
  },
  changePassword: async (currentPassword: string, newPassword: string) => {
    try {
      const response = await axiosInstance.patch("users/change-password", { currentPassword, newPassword });

      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export default UserAPI;
