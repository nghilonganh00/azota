import axios from "axios";

const ClassAPI = {
  create: async (
    className: string,
    classYear: string,
    classGroupId?: number,
  ) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/class",
        {
          className,
          classYear,
          classGroupId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            x_authorization: localStorage.getItem("userId"),
          },
        },
      );

      console.log("Add class api response: ", response);
      return response;
    } catch (error) {
      console.log("Error in ClassAPI: ", error);
      return {};
    }
  },
};

export default ClassAPI;
