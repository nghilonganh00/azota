const accessToken = localStorage.getItem("accessToken");

export const TeacherAPI = {
  register: async () => {
    try {
      if (!accessToken) {
        throw new Error("Access Token not found in localStorage.");
      }

      const url = new URL("http://localhost:8080/api/teachers/register");

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {}
  },
};
