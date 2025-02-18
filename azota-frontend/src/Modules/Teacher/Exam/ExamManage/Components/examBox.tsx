import { FileCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { DateTimeFormat, isoDateUtil } from "../../../../../Utils/date";
import { ExamPreview } from "../libs/interface";

interface ExamBoxProps {
  examPreview: ExamPreview;
}

const ExamBox: React.FC<ExamBoxProps> = (props) => {
  const { examPreview } = props;

  return (
    <Link
      to={`/teacher/exam/exam-results-list/${examPreview.id}`}
      className="tra col-span-12 rounded-md bg-white p-2 shadow-sm hover:scale-105 hover:cursor-pointer md:col-span-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FileCheck strokeWidth={1.5} size={40} className="text-orange-500" />
          <div className="space-y-1">
            <div className="text-sm font-medium text-slate-900">{examPreview.title}</div>
            <div>
              <div className="text-xs text-slate-500">
                {`Ngày tạo: ${isoDateUtil.toDateAndTime(examPreview.createdAt, DateTimeFormat.FULL_DATE_TIME_FORMAT)}`}
              </div>
              <div className="text-xs text-slate-500">
                {`Thời gian nộp bài: ${examPreview.duration ? `${examPreview.duration} phút` : "Không giới hạn"}`}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-full bg-[#68cc00] px-2 py-1 text-xs font-bold text-white">
          {examPreview.examResults.length}
        </div>
      </div>
    </Link>
  );
};

export default ExamBox;
