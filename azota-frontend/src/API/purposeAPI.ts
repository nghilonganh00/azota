import axios, { AxiosResponse } from "axios";

const PurposeAPI = {
  getAll: async (): Promise<AxiosResponse | null> => {
    try {
      const url = new URL("http://localhost:8080/api/purposes");

      const response = await axios.get("http://localhost:8080/api/purposes", {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      console.error("Error in PurposeAPI.getAll: ", error);
      return null;
    }
  },
};

export default PurposeAPI;
