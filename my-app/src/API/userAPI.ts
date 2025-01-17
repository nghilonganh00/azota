const accessToken = localStorage.getItem("accessToken");

const UserAPI = {
  getInfo: async (): Promise<any> => {
    try {
      if (!accessToken) {
        console.error("Access Token isn't in LocalStorage" + accessToken);
        return new Error("ACCESS_TOKEN_NOT_IN_LOCALSTORAGE");
      }

      const url = new URL(`http://localhost:8080/api/users`);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.error("Error in removeTeacherRole of UserAPI: ", error);
      return {};
    }
  },
  removeTeacherRole: async (): Promise<Response> => {
    try {
      if (!accessToken) {
        console.error("Access Token isn't in LocalStorage");
        return new Response(null, { status: 401, statusText: "Unauthorized" });
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
      console.log("Error in removeTeacherRole of UserAPI: ", error);
      return new Response(null, {
        status: 500,
        statusText: "Internal Server Error",
      });
    }
  },
  registerTeacherRole: async (): Promise<Response> => {
    try {
      if (!accessToken) {
        console.error("Access Token isn't in LocalStorage");
        return new Response(null, {
          status: 401,
          statusText: "Unauthorized",
        });
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
      return new Response(null, {
        status: 500,
        statusText: "Internal Server Error",
      });
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
