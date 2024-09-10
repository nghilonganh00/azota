import {
  Calendar,
  ChevronUp,
  Copy,
  FileInput,
  FilePen,
  FileTextIcon,
  LineChart,
  PenSquareIcon,
  QrCode,
  Settings,
  Share2,
  Target,
  Trash2,
  User,
  X,
} from "lucide-react";
import { ExamInfo } from "../libs/interface";
import { isoDateUtil } from "../../../../../Utils/date";
import ExamMenu from "../Components/examMenu";
import QRCodeGenerator from "../../../../../Globals/Components/QRCodeGenerator";
import Dropdown from "../../../../../Globals/Components/Dropdown/dropdown";
import MenuDropdown from "../../../../../Globals/Components/Dropdown/menudropdown";
import CopyBox from "../../../../../Globals/Components/copyBox";

interface ExamInfoAreaProps {
  examInfo: ExamInfo;
  setExamInfo: React.Dispatch<React.SetStateAction<ExamInfo>>;
}

const ExamInfoArea: React.FC<ExamInfoAreaProps> = (props) => {
  const { examInfo, setExamInfo } = props;
  const examConfig = examInfo.examObj || {};
  const author = examInfo.authorObj || {};
  const { examName, examSubmitCount, createdAt } = examConfig;

  const examURL = `http://localhost:3000/exam/${examConfig?.hashId}`;

  const handleCopyExamURL = () => {
    navigator.clipboard.writeText(examURL);
  };

  return (
    <div className="col-span-4 md:col-span-3">
      <div className="space-y-3 rounded-md bg-white px-3 py-4 shadow-md">
        <div className="space-y-3">
          <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
            <div className="text-sm font-semibold">{examName}</div>

            <div className="flex items-center gap-2">
              <CopyBox copyText={examURL}>
                <div
                  className="flex gap-2 rounded-md border border-blue-800 px-2 py-1.5 hover:cursor-pointer hover:bg-slate-100"
                  onClick={handleCopyExamURL}
                >
                  <Copy className="size-4 text-blue-700" />
                  <div className="text-xs font-semibold text-blue-900">
                    Copy link
                  </div>
                </div>
              </CopyBox>

              <MenuDropdown>
                <MenuDropdown.Button>
                  <QrCode className="text-blue-800 hover:cursor-pointer" />
                </MenuDropdown.Button>

                <MenuDropdown.Panel>
                  <div className="absolute right-0 top-10">
                    <QRCodeGenerator text="dwadwaojdwajpd" />
                  </div>
                </MenuDropdown.Panel>
              </MenuDropdown>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar strokeWidth={1.5} className="size-4" />
              <div className="text-sm">{`Ngày tạo: ${isoDateUtil.toDateAndTime(createdAt, "dd/mm/yyyy hh:mm")}`}</div>
            </div>

            <div className="flex items-center gap-2">
              <User strokeWidth={1.5} className="size-4" />
              <div className="text-sm">{`Người tạo: ${author.userFullName}`}</div>
            </div>

            <div className="flex items-center gap-2">
              <FilePen strokeWidth={1.5} className="size-4" />
              <div className="text-sm">{`Số lượt làm đề: ${examSubmitCount}`}</div>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-2 py-1">
            <Share2 className="size-4 text-gray-500" strokeWidth={1.5} />
            <div className="text-xs font-semibold text-gray-500">Chia sẻ</div>
          </div>
        </div>

        <ExamMenu />

        <div className="space-y-2">
          <div className="text-sm font-semibold">Giao cho</div>

          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-6 flex items-center justify-center rounded-md border border-gray-300 py-2">
              <div className="text-sm font-semibold text-gray-500">Test 1</div>
            </div>

            <div className="col-span-6 flex items-center justify-center rounded-md border border-gray-300 py-2">
              <div className="text-sm font-semibold text-gray-500">Test 1</div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="text-sm font-semibold">Nội dung</div>
            <div className="flex gap-2">
              <PenSquareIcon
                strokeWidth={1.5}
                className="size-4 text-blue-800"
              />
              <div className="text-xs font-semibold text-blue-900">Sửa</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <FileTextIcon className="size-4 text-blue-800" />
            <div className="text-sm font-semibold text-blue-800">
              Xem chi tiết
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <ChevronUp strokeWidth={1.5} className="size-5 text-gray-600" />
        </div>
      </div>
    </div>
  );
};

export default ExamInfoArea;
