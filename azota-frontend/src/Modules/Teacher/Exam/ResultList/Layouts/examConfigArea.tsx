import { Calendar, ChevronUp, Copy, FilePen, FileTextIcon, PenSquareIcon, QrCode, Share2, User } from "lucide-react";
import { DateTimeFormat, isoDateUtil } from "../../../../../Utils/date";
import ExamMenu from "../Components/examMenu";
import QRCodeGenerator from "../../../../../Globals/Components/QRCodeGenerator";
import MenuDropdown from "../../../../../Globals/Components/Dropdown/menudropdown";
import CopyBox from "../../../../../Globals/Components/copyBox";
import { ExamAssignmentSection } from "../Components/examAssignmentSection";
import { ExamContent } from "../Components/examContent";
import { Exam } from "../../../../../Globals/Interfaces/exam.interface";

interface ExamInfoAreaProps {
  exam: Exam;
  setExam: React.Dispatch<React.SetStateAction<Exam>>;
}

const ExamInfoArea: React.FC<ExamInfoAreaProps> = (props) => {
  const { exam, setExam } = props;
  const author = exam.teacher;
  const { title, examSubmitCount, createdAt } = exam;

  const examURL = `http://localhost:3000/exam/${exam?.hashId}`;

  const handleCopyExamURL = () => {
    navigator.clipboard.writeText(examURL);
  };

  return (
    <div className="col-span-4 md:col-span-3">
      <div className="space-y-3 rounded-md bg-white px-3 py-4 shadow-md">
        <div className="space-y-3">
          <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
            <div className="text-sm font-semibold">{title}</div>

            <div className="flex items-center gap-2">
              <CopyBox copyText={examURL}>
                <div
                  className="flex gap-2 rounded-md border border-blue-800 px-2 py-1.5 hover:cursor-pointer hover:bg-slate-100"
                  onClick={handleCopyExamURL}
                >
                  <Copy className="size-4 text-blue-700" />
                  <div className="text-xs font-semibold text-blue-900">Copy link</div>
                </div>
              </CopyBox>

              <MenuDropdown>
                <MenuDropdown.Button>
                  <QrCode className="text-blue-800 hover:cursor-pointer" />
                </MenuDropdown.Button>

                <MenuDropdown.Panel>
                  <div className="absolute right-0 top-10">
                    <QRCodeGenerator text={examURL} />
                  </div>
                </MenuDropdown.Panel>
              </MenuDropdown>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar strokeWidth={1.5} className="size-4" />
              <div className="text-sm">{`Ngày tạo: ${isoDateUtil.toDateAndTime(createdAt, DateTimeFormat.FULL_DATE_TIME_FORMAT)}`}</div>
            </div>

            <div className="flex items-center gap-2">
              <User strokeWidth={1.5} className="size-4" />
              <div className="text-sm">{`Người tạo: ${author?.user?.fullName}`}</div>
            </div>

            <div className="flex items-center gap-2">
              <FilePen strokeWidth={1.5} className="size-4" />
              <div className="text-sm">{`Số lượt làm đề: ${exam?.examResults?.length || 0}`}</div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-2 py-1">
            <Share2 className="size-4 text-gray-500" strokeWidth={1.5} />
            <div className="text-xs font-semibold text-gray-500">Chia sẻ</div>
          </div>
        </div>

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
