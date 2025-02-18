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
    <div className="grid grid-cols-12 gap-4 p-5">
      <div className="col-span-3 space-y-3">
        <div className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-800 py-3">
          <Plus className="size-4 text-slate-50" />
          <span className="text-sm font-semibold text-white">Đóng góp nội dung</span>
        </div>

        <div className="space-y-2 rounded-md bg-white p-2">
          <div className="flex items-center justify-start gap-2 rounded-md bg-cyan-500 px-4 py-2">
            <House className="size-4 text-slate-50" />
            <span className="text-sm font-semibold text-white">Tất cả tài liệu</span>
          </div>

          {TABS.map((tab, index) => (
            <div className="flex items-center justify-start gap-2 rounded-md bg-white px-4 py-2 hover:cursor-pointer hover:bg-gray-200">
              <tab.icon className="size-5 text-slate-800" strokeWidth={1.5} />
              <span className="text-sm font-semibold text-gray-600">{tab.label}</span>
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
