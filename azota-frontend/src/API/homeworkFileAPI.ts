import { AxiosResponse } from "axios";
import { axiosInstance } from "../services/axiosInstance";

const accessToken = localStorage.getItem("accessToken");

const HomeworkFileAPI = {
  add: async (homeworkId: number, title: string, link: string): Promise<AxiosResponse | null> => {
    try {
      const response = await axiosInstance.post(
        "homework-files/",
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
      const response = await axiosInstance.delete("homework-files/" + homeworkId, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
};

export default HomeworkFileAPI;
