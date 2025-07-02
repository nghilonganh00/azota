const userId = localStorage.getItem("userId");

const OptionAPI = {
  changeIsAnswer: async (optionId: string) => {
    try {
      if (!userId) {
        throw new Error("User ID not found in localStorage.");
      }

      const url = `option/change-is-answer/${optionId}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: userId,
        },
      });

      const responseObj = await response.json();
      return responseObj;
    } catch (error) {
      console.error(`Error in ExamAPI.updatedConfigByHashId: ${error}`);
      return {};
    }
  },
};

export default OptionAPI;
