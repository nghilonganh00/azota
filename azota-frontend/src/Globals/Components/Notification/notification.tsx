import { useEffect, useState } from "react";
import { LuBell } from "react-icons/lu";
import { getSocket } from "../../../services/socketService";

export const Notification = () => {
  const [notifications, setNotifications] = useState<any[]>([]);

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
  return <LuBell className="size-5 text-slate-600 dark:text-slate-200" />;
};
