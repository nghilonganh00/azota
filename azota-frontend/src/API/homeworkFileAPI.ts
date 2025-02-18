import axios, { AxiosResponse } from "axios";

const accessToken = localStorage.getItem("accessToken");

const HomeworkFileAPI = {
  add: async (homeworkId: number, title: string, link: string): Promise<AxiosResponse | null> => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/homework-files/",
        { homeworkId, title, link },
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

  remove: async (homeworkId: number) => {
    try {
      const response = await axios.delete(
        "http://localhost:8080/api/homework-files/" + homeworkId,
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
};

export default HomeworkFileAPI;
