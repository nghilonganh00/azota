import { useEffect, useRef, useState } from "react";
import { LuBell } from "react-icons/lu";
import { getSocket } from "../../../services/socketService";
import { NotificationAPI } from "../../../API/notificationAPI";
import UserAvatar from "../userAvatar";
import { Notification as INotification } from "../../Interfaces/info.interface";
import { DateTimeFormat, isoDateUtil } from "../../../Utils/date";

const NotificationItem = ({ notification }: { notification: INotification }) => {
  return (
    <div className={`flex items-center gap-4 px-2 ${notification.readAt ? "opacity-40" : ""}`}>
      <UserAvatar fullname="Lê Văn Thiện" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="font-semibold">Lê Văn Thiện</div>
          <div className="text-xs dark:text-slate-300">
            {notification.createdAt &&
              isoDateUtil.toDateAndTime(notification.createdAt, DateTimeFormat.FULL_DATE_TIME_FORMAT)}
          </div>
        </div>
        <div className="text-sm dark:text-slate-300">{notification?.message || ""}</div>
      </div>
    </div>
  );
};

export const Notification = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const visibleNotifications = notifications
    .sort(
      (a, b) =>
        Number(!!a.readAt) - Number(!!b.readAt) || new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 4);
  const [isOpenDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  console.log("noti: ", notifications);

  useEffect(() => {
    //When dropdown open, fetch the new notification
    const fetchNotificationData = async () => {
      const queryParams = { page: 1, limit: 4, sortField: "readAt", sortOrder: "ASC" };
      const response = await NotificationAPI.get(queryParams);
      setNotifications(response?.data.data);
    };

    //When dropdown closed, Mask as read the showed notifications
    if (isOpenDropdown) {
      fetchNotificationData();
    } else {
      visibleNotifications.forEach((notification) => {
        if (!notification.readAt) {
          NotificationAPI.markAsRead(notification._id);
        }
      });
    }

    //When click outside, close dropdown
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenDropdown]);

  useEffect(() => {
    const socket = getSocket();

    if (socket) {
      const handleNotification = (data: any) => {
        console.log("📢 New Notification:", data.message);
        setNotifications((prev) => [...prev, data]);
      };

      socket.on("newNotification", handleNotification);

      return () => {
        socket.off("newNotification", handleNotification);
      };
    }
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="hover:cursor-pointer" onClick={() => setOpenDropdown(!isOpenDropdown)}>
        <LuBell className="size-5 text-slate-600 dark:text-slate-200" />

        <div className="absolute -right-1 -top-2 flex size-4 items-center justify-center rounded-full bg-red-600">
          <div className="text-xs text-white">
            {notifications.filter((notification) => notification.readAt === null).length}
          </div>
        </div>
      </div>

      {isOpenDropdown && (
        <div className="shado absolute right-0 top-6 z-10 w-96 rounded dark:bg-darkmode-600 dark:text-slate-300">
          <div className="mb-2 p-3 font-semibold">Thông báo</div>

          <div className="space-y-4 px-3">
            {visibleNotifications.map((notification) => (
              <NotificationItem key={notification._id} notification={notification} />
            ))}
          </div>

          <div className="p-4 text-center hover:cursor-pointer dark:text-blue-600">Xem tất cả</div>
        </div>
      )}
    </div>
  );
};
