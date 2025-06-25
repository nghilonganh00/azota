import { FileText } from "lucide-react";
import UserAvatar from "../../../../Globals/Components/userAvatar";
import { Notification } from "../../../../Globals/Interfaces/info.interface";
import { DateTimeFormat, isoDateUtil } from "../../../../Utils/date";

interface ExamNotifyItemProps {
  notification: Notification;
}

const ExamNotifyItem: React.FC<ExamNotifyItemProps> = (props) => {
  const { notification } = props;

  return (
    <div>
      <div className="flex justify-between rounded px-2 py-3 hover:cursor-pointer hover:bg-darkmode-400">
        <UserAvatar fullname={notification?.senderName || ""} />
        <div className="ml-4 flex-1 space-y-0.5">
          <p className="font-medium dark:text-gray-300">{`${notification?.senderName || ""} đã tạo bài tập mới`}</p>
          <div className="alight-center flex gap-2 text-gray-300">
            <FileText className="size-4 dark:text-blue-800" strokeWidth={1.6} />
            <div className="">{`${notification?.extraData?.homeworkTitle || ""}`}</div>

            {/* <div>
              Bắt đầu:{" "}
              {notification?.extraData?.startDate &&
                isoDateUtil.toDateAndTime(notification.extraData.startDate, DateTimeFormat.FULL_DATE_TIME_FORMAT)}
            </div>
            <div>
              Kết thúc:{" "}
              {notification?.extraData?.endDate &&
                isoDateUtil.toDateAndTime(notification.extraData.endDate, DateTimeFormat.FULL_DATE_TIME_FORMAT)}
            </div> */}
          </div>
          <div className="text-xs dark:text-gray-400">{`Lớp: ${notification?.extraData?.className || ""}`}</div>
        </div>

        <div className="text-xs dark:text-gray-400">
          {notification?.createdAt &&
            isoDateUtil.toDateAndTime(notification.createdAt, DateTimeFormat.FULL_DATE_TIME_FORMAT)}
        </div>
      </div>
    </div>
  );
};

export default ExamNotifyItem;
