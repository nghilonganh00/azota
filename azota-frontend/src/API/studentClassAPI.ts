import { AxiosResponse } from "axios";
import { NewStudentClass } from "../Modules/Teacher/Class/ClassDetail/Interface/interface";
import { BASE_API_URL } from "../Globals/Constant/constant";
import { axiosInstance } from "../services/axiosInstance";

const accessToken = localStorage.getItem("accessToken");
const STUDENT_CLASS_API_URL = `${BASE_API_URL}/student-classes`;

export const StudentClassroomAPI = {
  getSubmissionsByHomeworkId: async (homeworkId: string | number): Promise<AxiosResponse> => {
    try {
      if (!accessToken) {
        throw new Error("Access token not found in localStorage");
      }

      const url = `http://localhost:8080/api/student-classes/homework/${homeworkId}/submissions`;
      const response = await axiosInstance.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      throw error;
    }
  },
  getByClassroomId: async (classroomId: string | number): Promise<AxiosResponse | null> => {
    try {
      const response = await axiosInstance.get(`${STUDENT_CLASS_API_URL}/classroom/${classroomId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
  identify: async (id: string | number): Promise<AxiosResponse> => {
    try {
      if (!accessToken) {
        throw new Error("Access token not found in localStorage");
      }

      const response = await axiosInstance.get(`http://localhost:8080/api/student-classes/${id}/identify`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      throw error;
    }
  },

  create: async (studentClass: NewStudentClass): Promise<AxiosResponse | null> => {
    try {
      if (!accessToken) {
        throw new Error("Access token not found in localStorage");
      }

      const response = await axiosInstance.post(`http://localhost:8080/api/student-classes`, studentClass, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.error("Error in StudentClassroomAPI.create: ", error);
      return null;
    }
  },

  createAnonymous: async (fullname: string): Promise<AxiosResponse | null> => {
    try {
      const response = await axiosInstance.post(
        `${STUDENT_CLASS_API_URL}/anonymous`,
        { fullname },
        {
          headers: { "Content-type": "application/json" },
        },
      );

      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
