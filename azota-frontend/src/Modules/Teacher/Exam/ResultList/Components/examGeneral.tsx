import { Calendar, Copy, FilePen, QrCode, Share2, User } from "lucide-react";
import CopyBox from "../../../../../Globals/Components/copyBox";
import MenuDropdown from "../../../../../Globals/Components/Dropdown/menudropdown";
import QRCodeGenerator from "../../../../../Globals/Components/QRCodeGenerator";
import { DateTimeFormat, isoDateUtil } from "../../../../../Utils/date";
import { Exam } from "../../../../../Globals/Interfaces/exam.interface";

interface ExamGeneralProps {
  exam: Exam;
}

export const ExamGeneral: React.FC<ExamGeneralProps> = (props) => {
  const { exam } = props;

  const author = exam.teacher;
  const { title, createdAt } = exam;

  const examURL = `http://localhost:3000/exam/${exam?.hashId}`;

  const handleCopyExamURL = () => {
    navigator.clipboard.writeText(examURL);
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
        <div className="text-sm font-semibold">{title}</div>

        <div className="flex items-center gap-2">
          <CopyBox copyText={examURL}>
            <div
              className="flex gap-2 rounded-md border border-blue-800 px-2 py-1.5 hover:cursor-pointer hover:bg-slate-100 dark:bg-darkmode-700 dark:hover:bg-darkmode-600"
              onClick={handleCopyExamURL}
            >
              <Copy className="size-4 text-blue-700" />
              <div className="text-xs font-semibold text-blue-900 dark:text-blue-700">Copy link</div>
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
          <div className="text-sm">{`Người tạo: ${author?.user?.fullname}`}</div>
        </div>

        <div className="flex items-center gap-2">
          <FilePen strokeWidth={1.5} className="size-4" />
          <div className="text-sm">{`Số lượt làm đề: ${exam?.examResults?.length || 0}`}</div>
        </div>
      </div>

      <div className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-2 py-1 text-gray-500 dark:border-darkmode-400 dark:text-slate-300">
        <Share2 className="size-4" strokeWidth={1.5} />
        <div className="text-xs font-medium">Chia sẻ</div>
      </div>
    </div>
  );
};
