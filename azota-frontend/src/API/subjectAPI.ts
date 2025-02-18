import axios, { AxiosResponse } from "axios";

const SubjectAPI = {
  getByGradeId: async (gradeId: number | string): Promise<AxiosResponse | null> => {
    try {
      const response = await axios.get(`http://localhost:8080/api/subjects/grade/${gradeId}`, {
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
