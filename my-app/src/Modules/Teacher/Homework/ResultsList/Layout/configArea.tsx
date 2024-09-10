import {
  Calendar,
  CalendarOff,
  ChevronUp,
  Copy,
  FileText,
  PencilLineIcon,
  QrCode,
  Settings,
  Share2,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { isoDateUtil } from "../../../../../Utils/date";
import { Homework } from "../Interface/interface";
import { Link } from "react-router-dom";
import ConfigContent from "../Components/configContent";
import ConfigFile from "../Components/configFile";

interface ConfigAreaProps {
  homework: Homework;
  setHomework: React.Dispatch<React.SetStateAction<Homework>>;
}

const ConfigArea: React.FC<ConfigAreaProps> = (props) => {
  const { homework, setHomework } = props;
  const { id, Homework, Class, createdAt, updatedAt } = homework;
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
    <div className="space-y-3 rounded-md bg-white px-3 py-4 shadow-md">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">{homeworkName}</div>
          <div className="flex items-center gap-2">
            <div className="flex gap-2 rounded-md border border-blue-800 px-2 py-1.5">
              <Copy className="size-4 text-blue-700" />
              <div className="text-xs font-semibold text-blue-900">
                Copy link
              </div>
            </div>
            <QrCode className="text-blue-800" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar strokeWidth={1.5} className="size-4" />
            <div className="text-sm">
              Ngày tạo: {isoDateUtil.toDateTime(createdAt)}
            </div>
          </div>

          {homeworkStartDate && (
            <div className="flex items-center gap-2">
              <Calendar strokeWidth={1.5} className="size-4" />
              <div className="text-sm">
                {"Bắt đầu nộp: " + isoDateUtil.toDateTime(homeworkStartDate)}
              </div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <CalendarOff strokeWidth={1.5} className="size-4" />
            <div className="text-sm">
              Hạn cuối:{" "}
              {homeworkEndDate
                ? isoDateUtil.toDateTime(homeworkEndDate)
                : "Không giới hạn"}
            </div>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-2 py-1">
          <Share2 className="size-4 text-gray-500" strokeWidth={1.5} />
          <div className="text-xs font-semibold text-gray-500">Chia sẻ</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm font-semibold">Menu</div>

        <div className="rounded-md bg-gray-100 p-2">
          <Link
            to={`/teacher/homework/config-homework/${Homework.id}`}
            className="flex items-center gap-2 rounded-md p-2 hover:cursor-pointer hover:bg-gray-200"
          >
            <Settings strokeWidth={1.5} className="size-4 text-gray-800" />
            <div className="text-sm">Cài đặt</div>
          </Link>

          <div className="flex items-center gap-2 rounded-md p-2 hover:cursor-pointer hover:bg-gray-200">
            <Trash2 strokeWidth={1.5} className="size-4 text-red-600" />
            <div className="text-sm text-red-600">Xoá</div>
          </div>
        </div>
      </div>

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

      <ConfigFile homework={homework} setHomework={setHomework} />

      <ConfigContent homework={homework} setHomework={setHomework} />

      <div className="flex justify-center">
        <ChevronUp strokeWidth={1.5} className="size-5 text-gray-600" />
      </div>
    </div>
  );
};

export default ConfigArea;
