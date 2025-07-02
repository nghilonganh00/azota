import { axiosInstance } from "../services/axiosInstance";

const ExamByStudentAPI = {
  getAssignedExamStudentIds: async (examId: number) => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      if (!accessToken) {
        throw new Error("Access token not found in local storage");
      }

      const url = `exam-by-student/exam/${examId}/studentids`;

      const response = await axiosInstance.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};

export default ExamByStudentAPI;
