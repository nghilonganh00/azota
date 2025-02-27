import { Calendar, ChevronUp, Copy, FilePen, FileTextIcon, PenSquareIcon, QrCode, Share2, User } from "lucide-react";
import { DateTimeFormat, isoDateUtil } from "../../../../../Utils/date";
import ExamMenu from "../Components/examMenu";
import QRCodeGenerator from "../../../../../Globals/Components/QRCodeGenerator";
import MenuDropdown from "../../../../../Globals/Components/Dropdown/menudropdown";
import CopyBox from "../../../../../Globals/Components/copyBox";
import { ExamAssignmentSection } from "../Components/examAssignmentSection";
import { ExamContent } from "../Components/examContent";
import { Exam } from "../../../../../Globals/Interfaces/exam.interface";
import { ExamGeneral } from "../Components/examGeneral";

interface ExamInfoAreaProps {
  exam: Exam;
  setExam: React.Dispatch<React.SetStateAction<Exam>>;
  isOpenInfoArea: boolean;
}

const ExamInfoArea: React.FC<ExamInfoAreaProps> = (props) => {
  const { exam, setExam, isOpenInfoArea } = props;

  return (
    <div className={`${isOpenInfoArea ? "col-span-4 md:col-span-3" : "hidden"} transition-all duration-300`}>
      <div className="space-y-3 rounded-md bg-white px-3 py-4 shadow-md dark:bg-darkmode-600 dark:text-slate-300">
        <ExamGeneral exam={exam} />

        <ExamMenu />

        <ExamAssignmentSection exam={exam} setExam={setExam} />

        <ExamContent />

        <div className="flex justify-center">
          <ChevronUp strokeWidth={1.5} className="size-5 text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default ExamInfoArea;
