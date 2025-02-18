import { ChevronDown, FileText } from "lucide-react";
import { GroupedHomework } from "../Interface/interface";
import { DateTimeFormat, isoDateUtil } from "../../../../../Utils/date";
import { Link, useParams } from "react-router-dom";

interface GroupedHomeworkProp {
  createdAt: string;
  groupedHomework: GroupedHomework;
}

const GroupedHomeworkList: React.FC<GroupedHomeworkProp> = (props) => {
  const { classId } = useParams();
  const { createdAt, groupedHomework } = props;

  return (
    <div>
      <div className="flex gap-2">
        <ChevronDown strokeWidth={1.5} className="size-6" />
        <div className="text-sm font-semibold text-gray-800">
          {isoDateUtil.toDateAndTime(createdAt, DateTimeFormat.FULL_DATE_TIME_FORMAT)}
        </div>
      </div>

      <div className="mt-3 space-y-2 rounded-md bg-white p-3 shadow">
        {groupedHomework[createdAt].map((homework, key) => (
          <Link
            to={`/teacher/homework/${homework.id}/submi`}
            className="flex items-center gap-4 rounded-md p-2 hover:cursor-pointer hover:bg-slate-100"
          >
            <FileText className="size-12 text-blue-800" strokeWidth={1.5} />
            <div>
              <div className="text-sm font-semibold">{homework.Homework.homeworkName}</div>
              <div className="mt-2 text-xs font-semibold text-gray-500">Đã nộp: 0/5</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GroupedHomeworkList;
