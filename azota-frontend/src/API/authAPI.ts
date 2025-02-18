const accessToken = localStorage.getItem("accessToken");

const AuthAPI = {
  register: async (username: string, password: string, userFullName: string, userRole: string) => {
    try {
      const requestData = {
        username,
        password,
        fullname: userFullName,
        role: userRole,
      };

      const url = "http://localhost:8080/api/auth/signup";

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
          Authorization: `${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.log("Error in login of AuthAPI: ", error);
    }
  },
  generateLoginQRCode: async (): Promise<Response> => {
    try {
      const url = "http://localhost:8080/api/auth/generate-login-qr";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      return new Response(null, {
        status: 500,
        statusText: "Internal Server Error",
      });
    }
  },
  approveLoginQrCode: async (sessionId: string): Promise<Response> => {
    try {
      const url = "http://localhost:8080/api/auth/approve-login-qr";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({
          sessionId: sessionId,
        }),
      });

      return response;
    } catch (error) {
      return new Response(null, {
        status: 500,
        statusText: "Internal Server Error",
      });
    }
  },
  checkLoginQrApproval: async (sessionId: string): Promise<Response> => {
    try {
      const url = "http://localhost:8080/api/auth/check-qr-login-approval";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${accessToken}`,
        },
        body: JSON.stringify({
          sessionId: sessionId,
        }),
      });

      return response;
    } catch (error) {
      return new Response(null, {
        status: 500,
        statusText: "Internal Server Error",
      });
    }
  },
};

export default AuthAPI;
