const StudentProfileAPI = {
  get: async (classId: string) => {
    try {
      const url = new URL(`student-profile/${classId}`);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseObj = await response.json();
      return responseObj.data;
    } catch (error) {
      console.error("Error in SubjectProfile.get: ", error);
      return {};
    }
  },
};

export default StudentProfileAPI;
