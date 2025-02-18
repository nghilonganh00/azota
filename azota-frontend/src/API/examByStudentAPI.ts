const ExamByStudentAPI = {
  getAssignedExamStudentIds: async (examId: number) => {
    try {
      const url = new URL(`http://localhost:8080/api/exam-by-student/exam/${examId}/studentids}`);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("userId") ?? "",
        },
      });

      const responseObj = await response.json();
      return responseObj.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};

export default ExamByStudentAPI;
