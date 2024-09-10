const FrontHomeworkAPI = {
  getByHashId: async (hashId: string) => {
    try {
      const url = new URL(`http://localhost:8080/api/front-homework`);
      url.searchParams.append("hashId", hashId);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseObj = await response.json();
      return responseObj.data;
    } catch (error) {
      throw error;
    }
  },
};

export default FrontHomeworkAPI;
