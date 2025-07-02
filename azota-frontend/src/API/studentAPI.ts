import axios from "axios";
import { NewStudent } from "../Modules/Teacher/Class/ClassDetail/Interface/interface";
import { axiosInstance } from "../services/axiosInstance";

const accessToken = localStorage.getItem("accessToken");

const StudentAPI = {
  confirm: async (studentId: string | number) => {
    try {
      const response = await axiosInstance.get("student/confirm/" + studentId, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.data;
      return data;
    } catch (error) {
      console.error(error);
      return {};
    }
  },
  getExamResult: async (examId: string, classroomId: string) => {
    try {
      const response = await axiosInstance.get("student/exam-result", {
        params: { examId, classroomId },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = await response.data;
      return data;
    } catch (error) {
      console.error("Error StudentAPI.getExamResult :" + error);
      return [];
    }
  },

  getExamAssignments: async (classId: number, examId: number) => {
    try {
      const response = await axiosInstance.get(
        `student/class/${classId}/exam/${examId}/assigments`,
        {
          headers: {
            "Content-Type": "application/json",
            // Authorization: `Bearer ${accessToken}`,
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
      if (!accessToken) {
        throw new Error("User ID not found in localStorage.");
      }

      const response = await axiosInstance.post(
        "student/",
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
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (response.status !== 201) {
        throw new Error(`HTTP error! status: ${response.status}, message: ${response.data.message}`);
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
