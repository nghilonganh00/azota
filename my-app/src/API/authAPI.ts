const AuthAPI = {
  register: async (
    username: string,
    password: string,
    userFullName: string,
    userRole: string,
  ) => {
    try {
      const requestData = {
        username,
        password,
        userFullName,
        userRole,
      };

      const url = "http://localhost:8080/api/auth/register";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      return response;
    } catch (error) {
      console.log("Error in register of AuthAPI: " + error);
    }
  },
  login: async (username: string, password: string) => {
    try {
      const requestData = {
        username,
        password,
      };

      const url = "http://localhost:8080/api/auth/login";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      return response;
    } catch (error) {
      console.log("Error in login of AuthAPI: ", error);
    }
  },
  loginByGoogle: async (accessToken: string) => {
    try {
      const url = "http://localhost:8080/api/auth/login-by-google";

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          x_authorization: `${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.log("Error in login of AuthAPI: ", error);
    }
  },
};

export default AuthAPI;
