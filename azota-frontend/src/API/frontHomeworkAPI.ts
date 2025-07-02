import { axiosInstance } from "../services/axiosInstance";

const FrontHomeworkAPI = {
  getByHashId: async (hashId: string) => {
    try {
      const url = `front-homework`;

      const response = await axiosInstance.get(url, {
        params: {
          hashId: hashId,
        },
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default FrontHomeworkAPI;
