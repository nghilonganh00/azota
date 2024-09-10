import { FileText } from "lucide-react";
import { isoDateUtil } from "../../../../../Utils/date";
import { Link } from "react-router-dom";
import { Homework } from "../../ResultsList/Interface/interface";

interface HomeworkBoxProps {
  data: Homework;
}

const HomeworkBox: React.FC<HomeworkBoxProps> = (props) => {
  const { data } = props;
  const { id, Homework, Class, createdAt, updatedAt } = data;
  const {
    homeworkName,
    homeworkContent,
    homeworkStartDate,
    homeworkEndDate,
    homeworkShowResult,
    homeworkMustLogin,
    teacherId,
  } = Homework;

  return (
    <Link
      to={`/teacher/homework/${id}/class/${Class.id}/homework-results-list`}
      className="col-span-3"
    >
      <div className="flex items-center justify-between rounded-md bg-white p-2 shadow-sm duration-200 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-md">
        <div className="flex items-center gap-4">
          <FileText strokeWidth={1.5} size={40} className="text-blue-900" />
          <div className="space-y-1">
            <div className="text-sm font-medium text-slate-900">
              {homeworkName}
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-400">
                {`Ngày tạo: ${isoDateUtil.toDateTime(createdAt)}`}
              </div>
              <div className="text-xs font-semibold text-slate-400">
                Thời gian nộp bài:{" "}
                {homeworkEndDate
                  ? isoDateUtil.toDateTime(homeworkEndDate)
                  : "Không thời hạn"}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-full bg-[#68cc00] px-2.5 py-1 text-xs font-bold text-white">
          0/1
        </div>
      </div>
    </Link>
  );
};

export default HomeworkBox;
