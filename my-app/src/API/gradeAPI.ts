import axios from "axios";

const userId = localStorage.getItem("userId");

const GradeAPI = {
  getAll: async () => {
    try {
      const url = new URL("http://localhost:8080/api/grade");

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseObj = await response.json();
      if (!response.ok) {
        const errorMessage = await responseObj.message;
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorMessage}`,
        );
      }

      return responseObj.data;
    } catch (error) {
      console.error("Error in ClassGroupAPI.getAll: ", error);
      return [];
    }
  },
};

export default GradeAPI;
