import { AxiosResponse } from "axios";
import { axiosInstance } from "../services/axiosInstance";

const SubjectAPI = {
  getByGradeId: async (gradeId: number | string): Promise<AxiosResponse | null> => {
    try {
      const response = await axiosInstance.get(`subjects/grade/${gradeId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      console.log("Error in ClassGroupAPI.getAll: ", error);
      return null;
    }
  },
};

export default SubjectAPI;
