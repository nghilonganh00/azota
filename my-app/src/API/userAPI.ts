const accessToken = localStorage.getItem("userId");

const UserAPI = {
  getInfo: async (): Promise<any> => {
    try {
      if (!accessToken) {
        console.error("Access Token isn't in LocalStorage");
        return {};
      }

      const url = new URL(`http://localhost:8080/api/user/info`);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          x_authorization: accessToken,
        },
      });

      return response;
    } catch (error) {
      console.error("Error in removeTeacherRole of UserAPI: ", error);
      return {};
    }
  },
  removeTeacherRole: async () => {
    try {
      if (!accessToken) {
        console.error("Access Token isn't in LocalStorage");
        return {};
      }

      const url = new URL(`http://localhost:8080/api/user/remove-teacher-role`);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          x_authorization: accessToken,
        },
      });

      return response;
    } catch (error) {
      console.error("Error in removeTeacherRole of UserAPI: ", error);
      return {};
    }
  },
  registerTeacherRole: async () => {
    try {
      if (!accessToken) {
        console.error("Access Token isn't in LocalStorage");
        return {};
      }

      const url = new URL(
        `http://localhost:8080/api/user/register-teacher-role`,
      );

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          x_authorization: accessToken,
        },
      });

      return response;
    } catch (error) {
      console.error("Error in registerTeacherRole of UserAPI: ", error);
      return {};
    }
  },
  createAnonymous: async (fullName: string) => {
    try {
      const url = new URL(`http://localhost:8080/api/user/anonymous`);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName: fullName }),
      });

      return response;
    } catch (error) {
      console.error("Error in createAnonymous of UserAPI: ", error);
      return {};
    }
  },
};

export default UserAPI;
