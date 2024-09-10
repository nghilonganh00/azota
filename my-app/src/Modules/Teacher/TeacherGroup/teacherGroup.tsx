import {
  ChevronDown,
  ChevronsDownUp,
  PanelLeftClose,
  Plus,
  Search,
} from "lucide-react";
import TeacherBox from "./Components/teacherBox";
import DelegationBox from "./Components/delegationBox";

const TeacherGroup = () => {
  return (
    <div className="h-full flex items-start gap-4 p-4 shadow-sm">
      <div className="h-full bg-white rounded-md px-2">
        <div className="flex items-center gap-2 py-2 border-b border-solid border-gray-200">
          <div className="relative">
            <input
              type="text"
              className="w-64 px-2 py-2 rounded-md text-sm border border-solid border-slate-200 shadow-sm"
              placeholder="Tìm tên, phone hoặc Email"
            />
            <Search className="size-4 absolute right-3 top-2.5 text-slate-500" />
          </div>
          <div className="p-2 bg-slate-200 rounded-md hover:bg-slate-100 hover:cursor-pointer">
            <Plus className="size-5 text-slate-500" />
          </div>
        </div>

        <div className="space-y-3 mt-4 pr-2">
          <TeacherBox />
          <TeacherBox />
          <TeacherBox />
          <TeacherBox />
          <TeacherBox />
        </div>
      </div>

      <div className="w-full space-y-2">
        <div className="bg-white p-2 rounded-md shadow-sm">
          <div className="p-2 border border-slate-200 rounded-md shadow-sm max-w-min">
            <PanelLeftClose className="size-4 text-slate-700" strokeWidth={1} />
          </div>
        </div>

        <div className="rounded-md bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200/60 text-slate-500 p-3">
            <div className="text-md font-medium">Phân quyền trong lớp</div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" />
                <div>Chọn tất cả</div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" />
                <div>Lớp đã gán quyền</div>
              </div>
            </div>
          </div>

          <div className="p-3">
            <div className="flex items-center">
              <div className="relative flex-1">
                <input
                  type="text"
                  className="w-full px-2 py-2 rounded-md text-sm border border-solid border-slate-200 shadow-sm"
                  placeholder="Tìm kiếm theo tên lớp"
                />
                <Search className="size-4 absolute right-3 top-2.5 text-slate-600" />
              </div>
              <ChevronsDownUp className="text-slate-600" />
            </div>

            <div>
              <div className="flex items-center py-3">
                <ChevronDown className="text-slate-600" />
                <div className="font-semibold">Khác (2 lớp)</div>
              </div>
              <div className="grid grid-cols-12 gap-6">
                <DelegationBox />
                <DelegationBox />
                <DelegationBox />
                <DelegationBox />
                <DelegationBox />
                <DelegationBox />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full mt-2">
          <div className="flex items-center gap-2 float-right">
            <div className="px-8 py-2 rounded-md bg-slate-200 font-semibold text-sm text-gray-600 hover:bg-slate-100 hover:cursor-pointer">
              Hủy
            </div>
            <div className="px-8 py-2 rounded-md bg-blue-800 font-semibold text-sm text-white hover:bg-blue-700 hover:cursor-pointer">
              Lưu
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherGroup;
