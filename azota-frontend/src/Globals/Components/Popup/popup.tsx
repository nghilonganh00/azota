import { useCallback } from "react";
import { useNotification } from "../../Context/NotificationContext";

// Legacy hook for backward compatibility
export const usePopup = () => {
  const { addNotification } = useNotification();

  const handleNotify = useCallback(
    (message: string, type: "SUCCESS" | "WARNING" = "SUCCESS") => {
      addNotification(message, type);
    },
    [addNotification],
  );

  const PopupComponent = () => null; // No longer needed with context

  return { handleNotify, Popup: PopupComponent };
};

// Export the context for direct usage
export { useNotification, NotificationProvider } from "../../Context/NotificationContext";
