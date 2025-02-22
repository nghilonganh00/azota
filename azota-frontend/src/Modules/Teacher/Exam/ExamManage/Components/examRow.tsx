import { File, FileCheck } from "lucide-react";
import { DateTimeFormat, isoDateUtil } from "../../../../../Utils/date";
import { useNavigate } from "react-router-dom";
import { Exam } from "../../../../../Globals/Interfaces/exam.interface";

interface ExamRowProps {
  examConfig: Exam;
}

const ExamRow: React.FC<ExamRowProps> = (props) => {
  const navigate = useNavigate();

  const { examConfig } = props;
  const { title, examResults, assignType, isPublish, updatedAt } = examConfig;

  const handleRowClick = () => {
    navigate(`/teacher/exam/exam-results-list/${examConfig.id}`);
  };

  const getAssignType = () => {
    switch (assignType) {
      case "ALL":
        return "Tất cả mọi người";
      case "CLASS":
        return "Theo lớp";
      case "STUDENT":
        return "Theo học sinh";
      default:
        return "";
    }
  };

  return (
    <tr
      className="border-b text-slate-700 hover:cursor-pointer hover:shadow-md dark:border-slate-200 dark:text-gray-400"
      onClick={handleRowClick}
    >
      <td scope="row" className="px-6 py-4">
        <input type="checkbox" className="size-4 dark:bg-[rgb(var(--color-darkmode-800))]" />
      </td>
      <td className="flex items-center gap-3 py-4">
        {isPublish ? (
          <FileCheck className="text-orange-600" strokeWidth={1.5} />
        ) : (
          <File className="text-orange-600" strokeWidth={1.5} />
        )}
        <div className="whitespace-nowrap">{title}</div>
      </td>
      <td className="px-6 py-4 text-center">{examResults.length}</td>
      <td className="px-6 py-4">{isPublish ? "Đã xuất bản" : "Chưa xuất bản"}</td>
      <td className="px-6 py-4">{getAssignType()}</td>
      <td className="px-6 py-4">{isoDateUtil.toDateAndTime(updatedAt, DateTimeFormat.FULL_DATE_TIME_FORMAT)}</td>
    </tr>
  );
};

export default ExamRow;
