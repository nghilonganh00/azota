import { AxiosResponse } from "axios";
import { axiosInstance } from "../services/axiosInstance";

const accessToken = localStorage.getItem("accessToken");

const CLASSGROUP_API_URL = `classgroups`;

const ClassGroupAPI = {
  getAll: async () => {
    try {
      if (!accessToken) {
        throw new Error("User ID not found in localStorage.");
      }

      const response = await axiosInstance.get(`${CLASSGROUP_API_URL}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      console.error("Error in ClassGroupAPI.getAll: ", error);
      return null;
    }
  },
  getStudentClasseIds: async (examId: string | number): Promise<AxiosResponse | null> => {
    try {
      const userId = localStorage.getItem("accessToken");
      if (!userId) {
        throw new Error("User ID not found in localStorage.");
      }

      const response = await axiosInstance.get(`${CLASSGROUP_API_URL}/classrooms/student-classes/id`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.error("Error in ClassGroupAPI.getAll: ", error);
      return null;
    }
  },
  create: async (classgroupName: string): Promise<AxiosResponse | null> => {
    try {
      if (!accessToken) {
        throw new Error("User ID not found in localStorage.");
      }

      const requestData = {
        classgroupName: classgroupName,
      };

      const url = "classgroups";

      const response = await axiosInstance.post(url, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.error("Error in ClassGroupAPI.create: ", error);
      return null;
    }
  },
};

export default ClassGroupAPI;
