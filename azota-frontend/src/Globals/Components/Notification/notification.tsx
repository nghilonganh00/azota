import { useEffect, useState } from "react";
import { Fragment } from "react/jsx-runtime";

interface NotificationProps {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  type: "SUCCESS" | "WARNING";
}

const Notification: React.FC<NotificationProps> = (props) => {
  const { isOpen, setOpen, message, type } = props;

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const getColor = () => {
    switch (type) {
      case "SUCCESS":
        return "bg-[#68cc00]";
      case "WARNING":
        return "bg-[#ffcc00]";
      default:
        return "bg-[#68cc00]";
    }
  };

  return (
    <Fragment>
      {isOpen && (
        <div className="fixed right-0 top-0 flex w-full items-center justify-center pt-2">
          <div className={`flex items-center ${getColor()} px-24 py-3.5 shadow-md`}>
            <div className="text-sm font-semibold text-white">{message}</div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default Notification;
