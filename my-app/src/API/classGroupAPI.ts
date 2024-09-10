const ClassGroupAPI = {
  getAll: async () => {
    try {
      const url = new URL("http://localhost:8080/api/classgroup");

      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID not found in localStorage.");
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          x_authorization: userId,
        },
      });

      const responseObj = await response.json();
      if (!response.ok) {
        const errorMessage = await responseObj.message;
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorMessage}`,
        );
      }

      return responseObj.data;
    } catch (error) {
      console.error("Error in ClassGroupAPI.getAll: ", error);
      return [];
    }
  },
  getAllWithStudent: async () => {
    try {
      const url = new URL("http://localhost:8080/api/classgroup/class/student");

      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID not found in localStorage.");
      }

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          x_authorization: userId,
        },
      });

      const responseObj = await response.json();
      if (!response.ok) {
        const errorMessage = await responseObj.message;
        throw new Error(
          `HTTP error! status: ${response.status}, message: ${errorMessage}`,
        );
      }

      return responseObj.data;
    } catch (error) {
      console.error("Error in ClassGroupAPI.getAll: ", error);
      return [];
    }
  },
  create: async (classGroupName: string) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        throw new Error("User ID not found in localStorage.");
      }

      const requestData = {
        classGroupName,
      };

      const url = "http://localhost:8080/api/classgroup";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          x_authorization: userId,
        },
        body: JSON.stringify(requestData),
      });

      const responseObj = await response.json();
      return responseObj;
    } catch (error) {
      console.error("Error in ClassGroupAPI.create: ", error);
      return {};
    }
  },
};

export default ClassGroupAPI;
