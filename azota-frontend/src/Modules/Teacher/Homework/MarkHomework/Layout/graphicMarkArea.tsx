import {
  BringToFront,
  ChevronLeft,
  CircleCheck,
  History,
  Maximize,
  Menu,
  Redo,
  Type,
  Undo,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import useGoBack from "../../../../../Globals/Hooks/useGoBack";
import { HomeworkSubmission } from "../../../../../Globals/Interfaces/homework.interface";

interface GraphicMarkAreaProps {
  homeworkSubmission: HomeworkSubmission | null;
}
export const GraphicMarkArea: React.FC<GraphicMarkAreaProps> = (props) => {
  const { homeworkSubmission } = props;

  const goBack = useGoBack();

  return (
    <div className="col-span-8">
      <div className="over rounded-md shadow-sm">
        <div className="rounded-md bg-white">
          <div className="flex items-center gap-6 border-b border-gray-200 p-2">
            <div
              className="flex items-center gap-2 rounded-md px-2 py-3 hover:cursor-pointer hover:bg-stone-100"
              onClick={goBack}
            >
              <ChevronLeft strokeWidth={1.5} className="size-5" />
              <div className="text-sm font-semibold">Quay lại</div>
            </div>
            <BringToFront strokeWidth={1.5} className="size-5" />
            <ZoomIn strokeWidth={1.5} className="size-5" />
            <ZoomOut strokeWidth={1.5} className="size-5" />
            <Undo strokeWidth={1.5} className="size-5" />
            <Redo strokeWidth={1.5} className="size-5" />
            <Menu strokeWidth={1.5} className="ml-auto size-5" />
            <History strokeWidth={1.5} className="size-5" />
            <Maximize strokeWidth={1.5} className="size-5" />
          </div>
          <div className="flex items-center gap-4 py-2">
            <div className="flex items-center gap-4 border-r border-gray-200 px-2 pr-4">
              <div className="rounded-md bg-slate-200 px-2 py-1.5">
                <Type strokeWidth={1.5} className="size-5" />
              </div>
              <CircleCheck strokeWidth={1.5} className="size-5" />
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold">Một chạm thêm chữ</div>
              <input
                type="text"
                className="w-16 rounded-md border border-gray-300 py-1.5 text-center text-sm text-red-400 shadow-sm"
                value={"d"}
              />
            </div>
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold">Hai chạm thêm chữ</div>
              <input
                type="text"
                className="w-16 rounded-md border border-gray-300 py-1.5 text-center text-sm text-red-400 shadow-sm"
                value={"s"}
              />
            </div>
          </div>

          <div className="h-[600px] overflow-y-scroll">
            {homeworkSubmission?.files?.map((file, key) => {
              return <img src={file.link} key={key}></img>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
