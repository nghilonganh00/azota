const accessToken = localStorage.getItem("userId");

const ExamResultAPI = {
  getMark: async (examResultId: string | number) => {
    try {
      if (!accessToken) {
        throw new Error("User ID not found in localStorage.");
      }

      const url = `http://localhost:8080/api/exam-result/mark/${examResultId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          x_authorization: accessToken,
        },
      });

      if (!response.ok) {
        return [];
      }

      const responseObj = await response.json();
      return responseObj.data;
    } catch (error) {
      console.error(`Error in ExamResultAPI.getMark: ${error}`);
      return {};
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
          x_authorization: accessToken,
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
          x_authorization: accessToken,
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
  getLatest: async (examId: number) => {
    try {
      if (!accessToken) {
        throw new Error("User ID not found in localStorage.");
      }

      const url = `http://localhost:8080/api/exam-result/latest/${examId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          x_authorization: accessToken,
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
          x_authorization: accessToken,
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
  create: async (
    examId: number,
    examresAnswer: string,
    examresStarted: string,
  ) => {
    try {
      if (!accessToken) {
        throw new Error("User ID not found in localStorage.");
      }

      const url = `http://localhost:8080/api/exam-result`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          x_authorization: accessToken,
        },
        body: JSON.stringify({ examId, examresAnswer, examresStarted }),
      });

      if (!response.ok) {
        return [];
      }

      const responseObj = await response.json();
      return responseObj.data;
    } catch (error) {
      console.error(`Error in ExamAPI.create: ${error}`);
      return {};
    }
  },
};

export default ExamResultAPI;
