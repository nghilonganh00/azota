import { AxiosResponse } from "axios";
import { BASE_API_URL } from "../Globals/Constant/constant";
import { axiosInstance } from "../services/axiosInstance";

const accessToken = localStorage.getItem("accessToken");

const EXAM_RESULT_API_URL = `${BASE_API_URL}/exam-results`;

const ExamResultAPI = {
  getDetailById: async (examResultId: string | number): Promise<AxiosResponse | null> => {
    try {
      if (!accessToken) {
        throw new Error("Access token not found in localStorage.");
      }

      const response = await axiosInstance.get(`${EXAM_RESULT_API_URL}/${examResultId}/detail`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.log(`Error in ExamResultAPI.getMark: ${error}`);
      return null;
    }
  },
  getMark: async (examResultId: string | number): Promise<AxiosResponse | null> => {
    try {
      if (!accessToken) {
        throw new Error("Access token not found in localStorage.");
      }

      const response = await axiosInstance.get(`${EXAM_RESULT_API_URL}/${examResultId}/score`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.log(`Error in ExamResultAPI.getMark: ${error}`);
      return null;
    }
  },
  getReview: async (examResultId: string | number) => {
    try {
      if (!accessToken) {
        throw new Error("User ID not found in localStorage.");
      }

      const url = `http://localhost:8080/api/exam-result/review/${examResultId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });

      if (!response.ok) {
        return [];
      }

      const responseObj = await response.json();
      return responseObj.data;
    } catch (error) {
      console.error(`Error in ExamResultAPI.getReview: ${error}`);
      return {};
    }
  },
  getAnswer: async (examResultId: string | number) => {
    try {
      if (!accessToken) {
        throw new Error("User ID not found in localStorage.");
      }

      const url = `http://localhost:8080/api/exam-result/answer/${examResultId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });

      if (!response.ok) {
        return [];
      }

      const responseObj = await response.json();
      return responseObj.data;
    } catch (error) {
      console.error(`Error in ExamResultAPI.getReview: ${error}`);
      return {};
    }
  },
  getHistory: async (examId: number, studentId: number): Promise<AxiosResponse | null> => {
    try {
      if (!accessToken) {
        throw new Error("Access token not found in localStorage.");
      }

      const response = await axiosInstance.get(`${EXAM_RESULT_API_URL}/exam/${examId}/student/${studentId}/history`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.log(`Error in ExamResultAPI.getMark: ${error}`);
      return null;
    }
  },
  getLatestByExamAndClass: async (examId: number, classroomId?: number): Promise<AxiosResponse | null> => {
    try {
      const classroomIdParam = classroomId ?? -1;

      if (!accessToken) {
        throw new Error("User ID not found in localStorage.");
      }

      const url = `http://localhost:8080/api/exam-results/latest/exam/${examId}/classroom/${classroomIdParam}`;

      const response = await axiosInstance.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.log(`Error in ExamAPI.getLatest: ${error}`);
      return null;
    }
  },
  getAssignedByClassLatest: async (examId: number, classId: number) => {
    try {
      if (!accessToken) {
        throw new Error("User ID not found in localStorage.");
      }

      const url = `http://localhost:8080/api/exam-result/latest/assigned-by-class/${examId}/${classId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      });

      if (!response.ok) {
        return [];
      }

      const responseObj = await response.json();
      return responseObj.data;
    } catch (error) {
      console.error(`Error in ExamAPI.getLatest: ${error}`);
      return {};
    }
  },
  create: async (hashId: string, answer: string, startedAt: string): Promise<AxiosResponse | null> => {
    try {
      if (!accessToken) {
        throw new Error("Access token not found in localStorage.");
      }

      const response = await axiosInstance.post(
        `${EXAM_RESULT_API_URL}`,
        { hashId, answer, startedAt },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return response;
    } catch (error) {
      console.error(`Error in ExamAPI.create: ${error}`);
      return null;
    }
  },
};

export default ExamResultAPI;
