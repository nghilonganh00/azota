import axios from "axios";
import { NewStudent } from "../Modules/Teacher/Class/ClassDetail/Interface/interface";

const userId = localStorage.getItem("userId");

const StudentAPI = {
  confirm: async (studentId: string) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/student/confirm/" + studentId,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error);
      return {};
    }
  },
  getExamResult: async (examId: string, classroomId: string) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/student/exam-result",
        {
          params: { examId, classroomId },
          headers: {
            "Content-Type": "application/json",
            x_authorization: userId,
          },
        },
      );

      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error StudentAPI.getExamResult :" + error);
      return [];
    }
  },

  getExamAssignments: async (classId: number, examId: number) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/student/class/${classId}/exam/${examId}/assigments`,
        {
          headers: {
            "Content-Type": "application/json",
            x_authorization: userId,
          },
        },
      );

      const data = await response.data;
      return data.data;
    } catch (error) {
      console.error("Error StudentAPI.getExamResult :" + error);
      return [];
    }
  },

  create: async ({
    studentName,
    identificationNumber,
    studentGender,
    studentDOB,
    studentPhone,
    studentEmail,
    classId,
  }: NewStudent) => {
    try {
      if (!userId) {
        throw new Error("User ID not found in localStorage.");
      }

      const response = await axios.post(
        "http://localhost:8080/api/student/",
        {
          studentName,
          identificationNumber,
          studentGender,
          studentDOB,
          studentPhone,
          studentEmail,
          classId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            x_authorization: userId,
          },
        },
      );

      if (response.status !== 201) {
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${response.data.message}`,
        );
      }

      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error);
      return {};
    }
  },
};

export default StudentAPI;
