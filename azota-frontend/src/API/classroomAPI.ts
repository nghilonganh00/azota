import { AxiosResponse } from "axios";
import { axiosInstance } from "../services/axiosInstance";

const accessToken = localStorage.getItem("accessToken");

export const ClassroomAPI = {
  getStudents: async (classId: string | number): Promise<AxiosResponse> => {
    try {
      const response = await axiosInstance.get(`http://localhost:8080/api/classrooms/${classId}/students`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("Add class api response: ", response);
      return response;
    } catch (error) {
      throw error;
    }
  },

  getHomeworks: async (
    sortParameter?: string,
    sortOrder?: string,
    limit?: number,
    page?: number,
    searchField?: string,
    searchKeyword?: string,
  ): Promise<AxiosResponse> => {
    try {
      const url = "http://localhost:8080/api/classrooms/homeworks";

      const params = {
        sortField: sortParameter,
        sortOrder: sortOrder,
        limit,
        page,
        searchField,
        searchKeyword,
      };

      const response = await axiosInstance.get(url, {
        params,
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

  create: async (className: string, classYear: string, classGroupId?: number) => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:8080/api/classrooms",
        {
          className,
          classYear,
          classgroupId: classGroupId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      console.log("Add class api response: ", response);
      return response;
    } catch (error) {
      console.log("Error in ClassroomAPI: ", error);
      return {};
    }
  },
};
