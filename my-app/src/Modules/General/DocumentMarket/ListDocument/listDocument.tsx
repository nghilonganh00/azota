import {
  BookText,
  CalendarCheck,
  CirclePlay,
  FileText,
  House,
  Plus,
  Projector,
  Scroll,
  User,
} from "lucide-react";
import GradesList from "./Components/gradesList";
import DocSearchResult from "./Components/docSearchResult";

const TABS = [
  { icon: FileText, label: "Tài liệu mới nhất" },
  { icon: CalendarCheck, label: "Bài tập, Đề thi" },
  { icon: Scroll, label: "Tài liệu tham khảo" },
  { icon: CirclePlay, label: "Bài giảng Video" },
  { icon: Projector, label: "Slide Powerpoint" },
  { icon: BookText, label: "Kế hoạch bài giảng" },
  { icon: User, label: "Nội dung của bạn" },
];

const ListDocument = () => {
  return (
    <div className="p-5 grid grid-cols-12 gap-4">
      <div className="col-span-3 space-y-3">
        <div className="w-full flex items-center bg-blue-800 justify-center gap-2 py-3 rounded-md">
          <Plus className="size-4 text-slate-50" />
          <span className="text-sm font-semibold text-white">
            Đóng góp nội dung
          </span>
        </div>

        <div className="bg-white rounded-md p-2 space-y-2">
          <div className="flex items-center justify-start gap-2 bg-cyan-500 py-2 rounded-md px-4">
            <House className="size-4 text-slate-50" />
            <span className="text-sm font-semibold text-white">
              Tất cả tài liệu
            </span>
          </div>

          {TABS.map((tab, index) => (
            <div className="flex items-center justify-start gap-2 bg-white py-2 rounded-md px-4 hover:bg-gray-200 hover:cursor-pointer">
              <tab.icon className="size-5 text-slate-800" strokeWidth={1.5} />
              <span className="text-sm font-semibold text-gray-600">
                {tab.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="col-span-9">
        <GradesList />

        <DocSearchResult />
      </div>
    </div>
  );
};

export default ListDocument;
