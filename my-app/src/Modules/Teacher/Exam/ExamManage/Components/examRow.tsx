import { File, FileCheck } from "lucide-react";
import { ExamConfig } from "../../../../../Globals/Interfaces/interface";
import { isoDateUtil } from "../../../../../Utils/date";

interface ExamRowProps {
  examConfig: ExamConfig;
}

const ExamRow: React.FC<ExamRowProps> = (props) => {
  const { examConfig } = props;
  const { examName, examSubmitCount, examAssignType, isPublish, updatedAt } =
    examConfig;

  const getAssignType = () => {
    switch (examAssignType) {
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
    <tr className="border-b text-slate-700 hover:cursor-pointer hover:shadow-md">
      <th scope="row" className="px-6 py-4">
        <input type="checkbox" className="size-4" />
      </th>
      <td className="flex items-center gap-3 py-4">
        {isPublish ? (
          <FileCheck className="text-orange-600" strokeWidth={1.5} />
        ) : (
          <File className="text-orange-600" strokeWidth={1.5} />
        )}
        <div className="whitespace-nowrap">{examName}</div>
      </td>
      <td className="px-6 py-4 text-center">{examSubmitCount}</td>
      <td className="px-6 py-4">
        {isPublish ? "Đã xuất bản" : "Chưa xuất bản"}
      </td>
      <td className="px-6 py-4">{getAssignType()}</td>
      <td className="px-6 py-4">
        {isoDateUtil.toDateAndTime(updatedAt, "dd/mm/yyyy hh:mm")}
      </td>
    </tr>
  );
};

export default ExamRow;
