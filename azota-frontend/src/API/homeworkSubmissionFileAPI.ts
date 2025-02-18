import axios, { AxiosResponse } from "axios";
import FirebaseStorage from "../Firebase/firebaseStorage";

const accessToken = localStorage.getItem("accessToken");

export const HomeworkSubmissionFileAPI = {
  create: async (
    hashId: string,
    studentClassId: number | string,
    files: File[],
  ): Promise<AxiosResponse | null> => {
    try {
      const fileObj = await Promise.all(
        files.map(async (file) => {
          const uploadFile = await FirebaseStorage.upload(file);
          return {
            title: uploadFile.filename,
            link: uploadFile.downloadURL,
          };
        }),
      );

      const url = `http://localhost:8080/api/homework-submission-files`;
      const response = await axios.post(
        url,
        { files: fileObj },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return response;
    } catch (error) {
      console.error("Error creating homework submission file:", error);
      return null;
    }
  },
};
