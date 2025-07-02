import { useEffect, useRef, useState } from "react";
import { LuBell } from "react-icons/lu";
import { getSocket } from "../../../services/socketService";
import { NotificationAPI } from "../../../API/notificationAPI";
import UserAvatar from "../userAvatar";
import { Notification as INotification } from "../../Interfaces/info.interface";
import { DateTimeFormat, isoDateUtil } from "../../../Utils/date";
import { Link } from "react-router-dom";

const NotificationItem = ({
  notification,
  setNotifications,
}: {
  notification: INotification;
  setNotifications: React.Dispatch<React.SetStateAction<INotification[]>>;
}) => {
  useEffect(() => {
    return () => {
      if (!notification.readAt) {
        NotificationAPI.markAsRead(notification._id);
        setNotifications((preValue) =>
          preValue.map((item) =>
            item._id === notification._id ? { ...item, readAt: new Date().toISOString() } : item,
          ),
        );
      }
    };
  }, []);

  return (
    <div className={`flex items-center gap-4 px-2 ${notification.readAt ? "opacity-40" : ""}`}>
      <UserAvatar fullname={notification.senderName} />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="font-semibold">{notification.senderName}</div>
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
  const [visibleNotifications, setVisibleNotifications] = useState<INotification[]>([]);

  const [isOpenDropdown, setOpenDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  console.log("noti: ", notifications);

  useEffect(() => {
    const fetchNotificationData = async () => {
      const queryParams = { page: 1, limit: 20, sortField: "readAt", sortOrder: "ASC" };
      const response = await NotificationAPI.get(queryParams);
      setNotifications(response?.data.data);
    };

    fetchNotificationData();

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
  }, []);

  useEffect(() => {
    if (isOpenDropdown) {
      setVisibleNotifications(
        [...notifications]
          .sort(
            (a, b) =>
              Number(!!a.readAt) - Number(!!b.readAt) ||
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .slice(0, 4),
      );
    }
  }, [isOpenDropdown]);

  useEffect(() => {
    let socketInstance: any;
    const initializeSocket = async () => {
      try {
        const socket = await getSocket();
        if (!socket) return;
        socketInstance = socket;

        console.log("🔌 Connected to WebSocket");

        // 🔥 Ensure the event listener is not duplicated
        socket.off("newNotification"); // ✅ Remove before adding

        const handleNotification = (data: any) => {
          console.log("📢 New Notification:", data);
          setNotifications((prev) => [...prev, data]);
        };

        socket.on("newNotification", handleNotification);

        return () => {
          console.log("🔄 Cleaning up WebSocket listener");
          socket.off("newNotification", handleNotification);
        };
      } catch (error) {
        console.error("❌ WebSocket connection failed:", error);
      }
    };

    initializeSocket();

    return () => {
      console.log("🔄 Unmounting, removing WebSocket listeners");
      socketInstance?.off("newNotification"); // ✅ Cleanup when unmounting
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="hover:cursor-pointer" onClick={() => setOpenDropdown(!isOpenDropdown)}>
        <LuBell className="size-5 text-slate-600 dark:text-slate-200" />

        <div className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-red-600">
          <div className="text-center text-xs text-white">
            {notifications?.filter((notification) => notification.readAt === null).length || 0}
          </div>
        </div>
      </div>

      {isOpenDropdown && (
        <div className="shado absolute right-0 top-6 z-10 w-96 rounded dark:bg-darkmode-600 dark:text-slate-300">
          <div className="mb-2 p-3 font-semibold">Thông báo</div>

          <div className="space-y-4 px-3">
            {visibleNotifications.map((notification) => (
              <NotificationItem
                key={notification._id}
                notification={notification}
                setNotifications={setNotifications}
              />
            ))}
          </div>

          <Link to={"/notification"}>
            <div className="p-4 text-center hover:cursor-pointer dark:text-blue-600">Xem tất cả</div>
          </Link>
        </div>
      )}
    </div>
  );
};
