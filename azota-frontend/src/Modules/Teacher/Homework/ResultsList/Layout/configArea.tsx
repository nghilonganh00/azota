import { Calendar, CalendarOff, ChevronUp, Copy, QrCode, Settings, Share2, Trash2 } from "lucide-react";
import { isoDateUtil } from "../../../../../Utils/date";
import { Link, useNavigate } from "react-router-dom";
import ConfigContent from "../Components/configContent";
import ConfigFile from "../Components/configFile";
import HomeworkAPI from "../../../../../API/homeworkAPI";
import { Homework } from "../../../../../Globals/Interfaces/homework.interface";

interface ConfigAreaProps {
  homework: Homework;
  setHomework: React.Dispatch<React.SetStateAction<Homework>>;
}

const ConfigArea: React.FC<ConfigAreaProps> = (props) => {
  const navigate = useNavigate();
  const { homework, setHomework } = props;
  const { id, hashId, title, content, startDate, endDate, isShowResult, isMustLogin, createdAt, classroom } = homework;

  const handleCopy = () => {
    navigator.clipboard
      .writeText(`http://localhost:3000/homework/${hashId}`)
      .then(() => {
        alert("Link copied to clipboard");
      })
      .catch((error) => {
        console.error("Failed to copy link: ", error);
        alert("Failed to copy link. Please try again");
      });
  };

  const handleRemove = async () => {
    console.log("remove");
    if (!id) return;

    const response = await HomeworkAPI.remove(id);
    if (response?.status !== 200) {
      return;
    }

    navigate(-1);
  };

  return (
    <div className="space-y-3 rounded-md bg-white px-3 py-4 shadow-md">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-sm font-semibold">{title}</div>
          <div className="flex items-center gap-2">
            <div
              className="flex gap-2 rounded-md border border-blue-800 px-2 py-1.5 text-blue-800 hover:cursor-pointer hover:bg-blue-800 hover:text-white"
              onClick={handleCopy}
            >
              <Copy className="size-4" />
              <div className="text-xs font-semibold">Copy link</div>
            </div>
            <QrCode className="text-blue-800" />
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Calendar strokeWidth={1.5} className="size-4" />
            <div className="text-sm">Ngày tạo: {isoDateUtil.toDateTime(createdAt)}</div>
          </div>

          {startDate && (
            <div className="flex items-center gap-2">
              <Calendar strokeWidth={1.5} className="size-4" />
              <div className="text-sm">{"Bắt đầu nộp: " + isoDateUtil.toDateTime(startDate)}</div>
            </div>
          )}

          <div className="flex items-center gap-2">
            <CalendarOff strokeWidth={1.5} className="size-4" />
            <div className="text-sm">Hạn cuối: {endDate ? isoDateUtil.toDateTime(endDate) : "Không giới hạn"}</div>
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
            to={`/teacher/homework/config-homework/${id}`}
            className="flex items-center gap-2 rounded-md p-2 hover:cursor-pointer hover:bg-gray-200"
          >
            <Settings strokeWidth={1.5} className="size-4 text-gray-800" />
            <div className="text-sm">Cài đặt</div>
          </Link>

          <div
            className="flex items-center gap-2 rounded-md p-2 hover:cursor-pointer hover:bg-gray-200"
            onClick={handleRemove}
          >
            <Trash2 strokeWidth={1.5} className="size-4 text-red-600" />
            <div className="text-sm text-red-600">Xoá</div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="text-sm font-semibold">Giao cho</div>

        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-6 flex items-center justify-center rounded-md border border-gray-300 py-2">
            <div className="text-sm font-medium text-gray-500">{classroom?.className}</div>
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
