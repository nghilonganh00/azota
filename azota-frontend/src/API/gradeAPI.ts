import { AxiosResponse } from "axios";
import { axiosInstance } from "../services/axiosInstance";

const GradeAPI = {
  getAll: async (): Promise<AxiosResponse | null> => {
    try {
      const response = await axiosInstance.get("http://localhost:8080/api/grades", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      console.error("Error in ClassGroupAPI.getAll: ", error);
      return null;
    }
  },
};

export default GradeAPI;
