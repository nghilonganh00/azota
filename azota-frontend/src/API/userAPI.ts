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
      const response = await axiosInstance.get("users");

      return response;
    } catch (error) {
      console.error("Error in getInfo of UserAPI: ", error);
      return null;
    }
  },

  removeTeacherRole: async (): Promise<AxiosResponse | null> => {
    try {
      const response = await axiosInstance.get("users/remove-teacher-role");
      return response;
    } catch (error) {
      console.error("Error in removeTeacherRole of UserAPI: ", error);
      return null;
    }
  },

  registerTeacherRole: async (): Promise<AxiosResponse | null> => {
    try {
      const response = await axiosInstance.get("user/register-teacher-role");
      return response;
    } catch (error) {
      console.error("Error in registerTeacherRole of UserAPI: ", error);
      return null;
    }
  },

  createAnonymous: async (fullName: string): Promise<AxiosResponse | null> => {
    try {
      const response = await axiosInstance.post("user/anonymous", { fullName });
      return response;
    } catch (error) {
      console.error("Error in createAnonymous of UserAPI: ", error);
      return null;
    }
  },

  updateUser: async (
    fullname: string,
    DOB: string,
    email: string,
    phone: string,
    gender: string,
    avatarURL: string,
  ): Promise<AxiosResponse | null> => {
    try {
      const response = await axiosInstance.patch("users", {
        fullname,
        DOB,
        email,
        phone,
        gender,
        avatarURL,
      });

      return response;
    } catch (error) {
      console.error("Error in updateUser of UserAPI: ", error);
      return null;
    }
  },

  changePassword: async (currentPassword: string, newPassword: string): Promise<AxiosResponse | null> => {
    try {
      const response = await axiosInstance.patch("users/change-password", {
        currentPassword,
        newPassword,
      });

      return response;
    } catch (error) {
      console.error("Error in changePassword of UserAPI: ", error);
      return null;
    }
  },
};

export default UserAPI;
