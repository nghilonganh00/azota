import { AxiosResponse } from "axios";
import { axiosInstance } from "../services/axiosInstance";

const accessToken = localStorage.getItem("accessToken");

const teacherPermissionAPI = {
  getTeachersByPrincipal: async () => {
    try {
      if (!accessToken) {
        throw new Error("Access Token not found in localStorage.");
      }

      const url = `teacher-permission/teachers`;
      const response = await axiosInstance.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      return null;
    }
  },

  registerTeacher: async (teacherEmail: string): Promise<AxiosResponse | null> => {
    try {
      if (!accessToken) {
        throw new Error("Access Token not found in localStorage.");
      }

      const url = `teacher-permission/register`;
      const response = await axiosInstance.post(
        url,
        { teacherEmail },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return response;
    } catch (error) {
      return null;
    }
  },
};

export default teacherPermissionAPI;
