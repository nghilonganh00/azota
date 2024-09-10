import axios from "axios";

const HomeworkFileAPI = {
  add: async (homeworkId: number, hwfileName: string, hwfileLink: string) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/homework-file/",
        { homeworkId, hwfileLink, hwfileName },
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

  delete: async (homeworkId: number) => {
    try {
      const response = await axios.delete(
        "http://localhost:8080/api/homework-file/" + homeworkId,
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

export default HomeworkFileAPI;
