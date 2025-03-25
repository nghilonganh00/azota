import { AxiosResponse } from "axios";
import { axiosInstance } from "../services/axiosInstance";
import { QueryParams } from "../Globals/Interfaces/interface";

const API_PATH = "notifications";

interface NotificationQueryParams extends QueryParams {
  type?: string;
}

export const NotificationAPI = {
  get: async (
    queryParams: NotificationQueryParams = { page: 1, limit: 50, sortField: "createdAt", sortOrder: "ASC" },
  ): Promise<AxiosResponse | null> => {
    try {
      const response = await axiosInstance.get(API_PATH, {
        headers: {
          "Content-Type": "application/json",
        },
        params: queryParams,
      });

      return response;
    } catch (error) {
      return null;
    }
  },

  markAsRead: async (notificationId: string): Promise<AxiosResponse | null> => {
    try {
      const response = await axiosInstance.patch(`${API_PATH}/${notificationId}`);

      return response;
    } catch (error) {
      return null;
    }
  },
};
