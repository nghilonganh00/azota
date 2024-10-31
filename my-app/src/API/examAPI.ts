import { ExamConfig } from "../Globals/Interfaces/interface";
import NewExam from "../Modules/Teacher/Exam/CreateExam/libs/interface";

const userId = localStorage.getItem("userId");

const ExamAPI = {
  create: async ({
    examName,
    examAssignType,
    examSubmitCount,
    gradeId,
    subjectId,
    purposeId,
    examDescribe,
    examContent,
  }: NewExam): Promise<any> => {
    try {
      if (!userId) {
        throw new Error("User ID not found in localStorage.");
      }

      const requestData = {
        examName,
        examAssignType,
        examSubmitCount,
        gradeId,
        subjectId,
        purposeId,
        examDescribe,
        examContent,
      };

      const url = "http://localhost:8080/api/exam";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          x_authorization: userId,
        },
        body: JSON.stringify(requestData),
      });

      return response;
    } catch (error) {
      throw error;
    }
  },
  getAllConfigs: async () => {
    try {
      const url = new URL(`http://localhost:8080/api/exam/preview`);

      if (!userId) {
        return [];
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          x_authorization: userId,
        },
      });

      if (!response.ok) {
        return [];
      }

      const responseObj = await response.json();
      return responseObj.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
  getConfigByHashId: async (hashId: string) => {
    try {
      const url = new URL(`http://localhost:8080/api/exam/config/${hashId}`);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          x_authorization: localStorage.getItem("userId") ?? "",
        },
      });

      const responseObj = await response.json();
      return responseObj.data;
    } catch (error) {
      console.error(error);
      return {};
    }
  },

  getDetailByHashId: async (hashId: string) => {
    try {
      const url = new URL(`http://localhost:8080/api/exam/${hashId}`);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          x_authorization: localStorage.getItem("userId") ?? "",
        },
      });

      const responseObj = await response.json();
      return responseObj.data;
    } catch (error) {
      console.error(error);
      return {};
    }
  },

  updatedConfigByHashId: async (exam: ExamConfig) => {
    try {
      if (!userId) {
        throw new Error("User ID not found in localStorage.");
      }

      const url = `http://localhost:8080/api/exam/config/${exam.hashId}`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          x_authorization: userId,
        },
        body: JSON.stringify(exam),
      });
      
      return response;
    } catch (error) {
      console.error(`Error in ExamAPI.updatedConfigByHashId: ${error}`);
      return {};
    }
  },
};

export default ExamAPI;
