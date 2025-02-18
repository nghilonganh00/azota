import axios, { AxiosResponse } from "axios";
import { BASE_API_URL } from "../Globals/Constant/constant";
import FirebaseStorage from "../Firebase/firebaseStorage";

const accessToken = localStorage.getItem("accessToken");
const HOMEWORK_SUBMISSION_API_URL = `${BASE_API_URL}/homework-submissions`;

export const HomeworkSubmissionAPI = {
  getDetail: async (homeworkSubmissionId: string): Promise<AxiosResponse | null> => {
    try {
      const url = `${HOMEWORK_SUBMISSION_API_URL}/${homeworkSubmissionId}`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.log(`Fetch Homework submission by hashId failed: ${error}`);
      return null;
    }
  },
  getByHomeworkHashId: async (
    hashId: string,
    studentClassId: string,
  ): Promise<AxiosResponse | null> => {
    try {
      const url = `${HOMEWORK_SUBMISSION_API_URL}/homework/${hashId}/student-class/${studentClassId}`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.log(`Fetch Homework submission by hashId failed: ${error}`);
      return null;
    }
  },
  getByHashIdAndStudentClassId: async (
    hashId: string,
    studentClassId: string,
  ): Promise<AxiosResponse | null> => {
    try {
      const url = `${HOMEWORK_SUBMISSION_API_URL}/homework/${hashId}/student-class/${studentClassId}`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.log(`Fetch Homework submission by hashId failed: ${error}`);
      return null;
    }
  },
  getStatus: async (homeworkId: string): Promise<AxiosResponse | null> => {
    try {
      const url = `${HOMEWORK_SUBMISSION_API_URL}/status/homework/${homeworkId}`;

      const response = await axios.get(url, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return response;
    } catch (error) {
      console.log(`Fetch Homework submission score failed: ${error}`);
      return null;
    }
  },
  submit: async (homeworkSubmissionId: string, files: File[]): Promise<AxiosResponse | null> => {
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

      const url = `${HOMEWORK_SUBMISSION_API_URL}/${homeworkSubmissionId}/submit`;

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
      console.log(`Fetch Homework submission by hashId failed: ${error}`);
      return null;
    }
  },
  mark: async (
    homeworkSubmissionId: string,
    comment: string,
    point: string,
    isShowPoint: boolean,
  ): Promise<AxiosResponse | null> => {
    try {
      const url = `${HOMEWORK_SUBMISSION_API_URL}/${homeworkSubmissionId}/mark`;

      const response = await axios.patch(
        url,
        { comment, point, isShowPoint },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return response;
    } catch (error) {
      console.log(`Mark Homework submission failed: ${error}`);
      return null;
    }
  },
  requestResend: async (homeworkSubmissionId: string): Promise<AxiosResponse | null> => {
    try {
      const url = `${HOMEWORK_SUBMISSION_API_URL}/${homeworkSubmissionId}/request-resend`;

      const response = await axios.patch(
        url,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      return response;
    } catch (error) {
      console.log(`Request resend Homework submission failed: ${error}`);
      return null;
    }
  },
};
