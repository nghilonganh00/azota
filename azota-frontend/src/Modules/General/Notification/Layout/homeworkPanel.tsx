import { useEffect, useState } from "react";
import { Notification } from "../../../../Globals/Interfaces/info.interface";
import { NotificationAPI } from "../../../../API/notificationAPI";
import NotifyItem from "../components/notifyItem";
import { NotificationTabs } from "../utils/constant";

const HomeworkPanel = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const fetchNotificationData = async () => {
      const queryParams = {
        page: 1,
        limit: 50,
        sortField: "readAt",
        sortOrder: "ASC",
        type: NotificationTabs.HOMEWORK,
      };
      const response = await NotificationAPI.get(queryParams);
      setNotifications(response?.data.data);
    };

    fetchNotificationData();
  }, []);

  return (
    <div>
      <div className="rounded-md px-4 py-2 dark:bg-darkmode-600">
        <h3 className="font-medium dark:text-gray-400">HÔM NAY</h3>
        <div className="mt-2 space-y-4">
          {notifications.map((notification) => (
            <NotifyItem key={notification._id} notification={notification} />
          ))}
        </div>
      </div>
    </div>
  );
};
export default HomeworkPanel;
