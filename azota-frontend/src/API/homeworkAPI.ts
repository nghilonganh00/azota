import { AxiosResponse } from "axios";
import { NewHomework } from "../Modules/Teacher/Homework/AddHomework/libs/interfaces";
import FirebaseStorage from "../Firebase/firebaseStorage";
import { Homework } from "../Globals/Interfaces/homework.interface";
import { BASE_API_URL } from "../Globals/Constant/constant";
import { axiosInstance } from "../services/axiosInstance";

const accessToken = localStorage.getItem("accessToken");
const HOMEWORK_API_URL = `${BASE_API_URL}/homeworks`;

const HomeworkAPI = {
  getAll: async (
    sortParameter?: string,
    sortOrder?: string,
    limit?: number,
    page?: number,
    searchField?: string,
    searchKeyword?: string,
  ): Promise<AxiosResponse> => {
    try {
      const url = "http://localhost:8080/api/homeworks";

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
  getAllByClassId: async (classId: string) => {
    try {
      if (!accessToken) {
        throw new Error("User ID not found in localStorage.");
      }

      const url = new URL(`http://localhost:8080/api/homework/classroom/${classId}`);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });

      const responseObj = await response.json();
      return responseObj.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  getDetail: async (homeworkId: string): Promise<AxiosResponse> => {
    try {
      const url = `http://localhost:8080/api/homeworks/${homeworkId}`;

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
  getByHashId: async (hashId: string): Promise<AxiosResponse> => {
    try {
      const url = `http://localhost:8080/api/homeworks/hash/${hashId}`;

      const response = await axiosInstance.get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      throw error;
    }
  },
  getResultOfClass: async (homeworkId: string, classId: string) => {
    try {
      const url = new URL(`http://localhost:8080/api/homework/${homeworkId}/homework-results`);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseObj = await response.json();
      return responseObj.data;
    } catch (error) {
      console.error(error);
      return {};
    }
  },
  getSubmissionsById: async (homeworkId: number | string): Promise<AxiosResponse> => {
    try {
      const url = `http://localhost:8080/api/homeworks/${homeworkId}/submission`;

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
  getClassWithHomework: async () => {
    try {
      const url = new URL("http://localhost:8080/api/homework/class");

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseObj = await response.json();
      return responseObj.data;
    } catch (error) {
      throw error;
    }
  },
  getConfig: async (homeworkId: string) => {
    try {
      const url = new URL(`http://localhost:8080/api/homework/${homeworkId}/config`);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseObj = await response.json();
      return responseObj.data;
    } catch (error) {
      throw error;
    }
  },

  trash: async (homeworkId: string) => {
    try {
      const url = new URL(`http://localhost:8080/api/homework/${homeworkId}/trash}`);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseObj = await response.json();
      return responseObj.data;
    } catch (error) {
      console.log("Error in homeworkAPI.trash: ", error);
      return {};
    }
  },

  create: async (newHomework: NewHomework) => {
    try {
      const { homeworkFiles } = newHomework;

      const homeworkFileObj = await Promise.all(
        homeworkFiles.map(async (homeworkFile) => {
          const uploadFile = await FirebaseStorage.upload(homeworkFile);
          return {
            title: uploadFile.filename,
            link: uploadFile.downloadURL,
          };
        }),
      );

      const response = await axiosInstance.post(
        "http://localhost:8080/api/homeworks/",
        { ...newHomework, homeworkFiles: homeworkFileObj },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      const responseObj = await response.data;
      return responseObj.data;
    } catch (error) {
      throw error;
    }
  },

  update: async (homework: Homework): Promise<AxiosResponse> => {
    try {
      const response = await axiosInstance.put(`${HOMEWORK_API_URL}/${homework.id}`, homework, {
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

  updateContent: async (homeworkId: string, content: string): Promise<AxiosResponse | null> => {
    try {
      const response = await axiosInstance.patch(
        `${HOMEWORK_API_URL}/${homeworkId}/content`,
        { content },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  remove: async (homeworkId: string | number): Promise<AxiosResponse | null> => {
    try {
      const response = await axiosInstance.delete(`${HOMEWORK_API_URL}/${homeworkId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};

export default HomeworkAPI;
