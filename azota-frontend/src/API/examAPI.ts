import axios, { Axios, AxiosResponse } from "axios";
import { Exam } from "../Globals/Interfaces/exam.interface";
import { CreateExam } from "../Modules/Teacher/Exam/CreateExam/libs/interface";
import { BASE_API_URL } from "../Globals/Constant/constant";

const accessToken = localStorage.getItem("accessToken");
const EXAM_API_URL = `${BASE_API_URL}/exams`;

const ExamAPI = {
  create: async ({
    examName,
    gradeId,
    subjectId,
    purposeId,
    examDescribe,
    examContent,
  }: CreateExam): Promise<AxiosResponse | null> => {
    try {
      if (!accessToken) {
        throw new Error("Access Token not found in localStorage.");
      }

      const requestBody = {
        title: examName,
        gradeId,
        subjectId,
        purposeId,
        examDescribe,
        content: examContent,
      };

      const response = await axios.post(`${EXAM_API_URL}`, requestBody, {
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
  getAllConfigs: async (): Promise<AxiosResponse | null> => {
    try {
      if (!accessToken) {
        return null;
      }

      const response = await axios.post("http://localhost:8080/api/exam/preview", {
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });

      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getPreviews: async (): Promise<AxiosResponse | null> => {
    try {
      if (!accessToken) {
        throw new Error("Access token not found in local storage");
      }

      const response = await axios.get(`${EXAM_API_URL}/previews`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          page: 1,
          limit: 20,
          sortField: "createdAt",
          sortOrder: "ASC",
        },
      });

      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
  getConfig: async (id: string): Promise<AxiosResponse | null> => {
    try {
      const response = await axios.get(`${EXAM_API_URL}/${id}/config`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  previewByHashId: async (hashId: string): Promise<AxiosResponse | null> => {
    try {
      const response = await axios.get(`${EXAM_API_URL}/hash-id/${hashId}/preview`, {
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

  getContent: async (id: string): Promise<AxiosResponse | null> => {
    try {
      if (!accessToken) {
        throw new Error("Access token not found");
      }

      const response = await axios.get(`${EXAM_API_URL}/${id}/content`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.log("Fetch exam content failed");
      return null;
    }
  },

  getContentByHashId: async (hashId: string): Promise<AxiosResponse | null> => {
    try {
      const response = await axios.get(`${EXAM_API_URL}/hash-id/${hashId}/content`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  },

  publish: async (
    examId: number | string,
    examConfig: Exam,
    assignedStudentIds: number[],
    assignedClassIds: number[],
  ): Promise<AxiosResponse | null> => {
    try {
      const response = await axios.post(
        `${EXAM_API_URL}/${examId}/publish`,
        { ...examConfig, assignedClassIds, assignedStudentIds },
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

  updatedConfigByHashId: async (exam: Exam) => {
    try {
      if (!accessToken) {
        throw new Error("User ID not found in localStorage.");
      }

      const url = `http://localhost:8080/api/exam/config/${exam.hashId}`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        body: JSON.stringify(exam),
      });

      return response;
    } catch (error) {
      console.error(`Error in ExamAPI.updatedConfigByHashId: ${error}`);
      return {};
    }
  },

  remove: async (id: string): Promise<AxiosResponse | null> => {
    try {
      const response = await axios.delete(`${EXAM_API_URL}/${id}`, {
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

export default ExamAPI;
