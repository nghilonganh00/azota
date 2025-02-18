import { PenSquare } from "lucide-react";
import { ExamAssignType } from "../../../../../Globals/Constant/constant";
import { Exam } from "../../../../../Globals/Interfaces/exam.interface";

interface ExamAssignmentSectionProps {
  exam: Exam;
  setExam: React.Dispatch<React.SetStateAction<Exam>>;
}

const ExamAssignmentBox = ({ exam }: { exam: Exam }) => {
  switch (exam.assignType) {
    case ExamAssignType.CLASS:
      return (
        <div className="grid grid-cols-12 gap-2">
          {exam.examClasses.map((examClass, key) => (
            <div
              className="col-span-6 flex items-center justify-center rounded-md border border-gray-300 py-2"
              key={key}
            >
              <div className="text-sm font-semibold text-gray-500">{examClass?.classroom?.className || ""}</div>
            </div>
          ))}
        </div>
      );

    default:
      return (
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-12 flex items-center justify-center rounded-md border border-gray-300 py-2">
            <div className="text-sm font-semibold text-gray-500">Tất cả mọi người</div>
          </div>
        </div>
      );
  }
};

export const ExamAssignmentSection: React.FC<ExamAssignmentSectionProps> = (props) => {
  const { exam, setExam } = props;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-sm font-semibold">Giao cho</div>

        <div className="flex gap-2 rounded-md px-2 py-1 hover:cursor-pointer hover:bg-blue-50">
          <PenSquare strokeWidth={1.5} className="size-4 text-blue-800" />
          <div className="text-xs font-semibold text-blue-900">Sửa</div>
        </div>
      </div>

      <ExamAssignmentBox exam={exam} />
    </div>
  );
};
