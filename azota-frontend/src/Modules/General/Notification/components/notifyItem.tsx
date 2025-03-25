import { Notification } from "../../../../Globals/Interfaces/info.interface";
import { ExamNotificationType } from "../utils/constant";
import ExamNotifyItem from "./examNotifyItem";

interface NotifyItemProps {
  notification: Notification;
}

const NotifyItem: React.FC<NotifyItemProps> = (props) => {
  const { notification } = props;
  const { type } = notification;

  if (Object.values(ExamNotificationType).includes(type as ExamNotificationType)) {
    return <ExamNotifyItem notification={notification} />;
  }
  return <ExamNotifyItem notification={notification} />;
};

export default NotifyItem;
