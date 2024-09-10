import axios from "axios";
import { NewHomework } from "../Modules/Teacher/Homework/AddHomework/libs/interfaces";
import FirebaseStorage from "../Firebase/firebaseStorage";
import { Homework as HomeworkConfig } from "../Modules/Teacher/Homework/ConfigHomework/interface";

const userId = localStorage.getItem("userId");

const HomeworkAPI = {
  getAll: async (sortParameter: string, sortOrder: string, limit: number) => {
    try {
      const url = new URL("http://localhost:8080/api/homework");

      url.searchParams.append("sortParameter", sortParameter);
      url.searchParams.append("sortOrder", sortOrder);
      url.searchParams.append("limit", limit.toString());

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
  getAllByClassId: async (classId: string) => {
    try {
      if (!userId) {
        throw new Error("User ID not found in localStorage.");
      }

      const url = new URL(
        `http://localhost:8080/api/homework/classroom/${classId}`,
      );

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          x_authorization: userId,
        },
      });

      const responseObj = await response.json();
      return responseObj.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  getDetail: async (homeworkId: string, classId: string) => {
    try {
      const url = new URL(
        `http://localhost:8080/api/homework/${homeworkId}/class/${classId}`,
      );

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
  getResultOfClass: async (homeworkId: string, classId: string) => {
    try {
      const url = new URL(
        `http://localhost:8080/api/homework/${homeworkId}/class/${classId}/homework-result`,
      );

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
      const url = new URL(
        `http://localhost:8080/api/homework/${homeworkId}/config`,
      );

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
      const url = new URL(
        `http://localhost:8080/api/homework/${homeworkId}/trash}`,
      );

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

  updateConfig: async (homeworkId: string, homeworkConfig: HomeworkConfig) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/homework/${homeworkId}/config`,
        { ...homeworkConfig },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const responseObj = await response.data;
      return responseObj.data;
    } catch (error) {
      throw error;
    }
  },
  updateContent: async (homeworkId: string, homeworkContent: string) => {
    try {
      const response = await axios.post(
        `http://localhost:8080/api/homework/${homeworkId}/content`,
        { homeworkContent },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const responseObj = await response.data;
      return responseObj.data;
    } catch (error) {
      throw error;
    }
  },

  create: async (newHomework: NewHomework) => {
    try {
      const { homeworkFiles } = newHomework;

      const homeworkFileObj = await Promise.all(
        homeworkFiles.map(async (homeworkFile) => {
          const uploadFile = await FirebaseStorage.upload(homeworkFile);
          return {
            homeworkFileName: uploadFile.filename,
            homeworkFileLink: uploadFile.downloadURL,
          };
        }),
      );

      const response = await axios.post(
        "http://localhost:8080/api/homework/",
        { ...newHomework, homeworkFiles: homeworkFileObj },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const responseObj = await response.data;
      return responseObj.data;
    } catch (error) {
      throw error;
    }
  },
};

export default HomeworkAPI;
