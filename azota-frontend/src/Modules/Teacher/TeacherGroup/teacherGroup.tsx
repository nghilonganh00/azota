import { ChevronDown, ChevronsDownUp, PanelLeftClose, Plus, Search } from "lucide-react";
import TeacherBox from "./Components/teacherBox";
import DelegationBox from "./Components/delegationBox";

const TeacherGroup = () => {
  return (
    <div className="flex h-full items-start gap-4 p-4 shadow-sm">
      <div className="h-full rounded-md bg-white px-2">
        <div className="flex items-center gap-2 border-b border-solid border-gray-200 py-2">
          <div className="relative">
            <input
              type="text"
              className="w-64 rounded-md border border-solid border-slate-200 px-2 py-2 text-sm shadow-sm"
              placeholder="Tìm tên, phone hoặc Email"
            />
            <Search className="absolute right-3 top-2.5 size-4 text-slate-500" />
          </div>
          <div className="rounded-md bg-slate-200 p-2 hover:cursor-pointer hover:bg-slate-100">
            <Plus className="size-5 text-slate-500" />
          </div>
        </div>

        <div className="mt-4 space-y-3 pr-2">
          <TeacherBox />
          <TeacherBox />
          <TeacherBox />
          <TeacherBox />
          <TeacherBox />
        </div>
      </div>

      <div className="w-full space-y-2">
        <div className="rounded-md bg-white p-2 shadow-sm">
          <div className="max-w-min rounded-md border border-slate-200 p-2 shadow-sm">
            <PanelLeftClose className="size-4 text-slate-700" strokeWidth={1} />
          </div>
        </div>

        <div className="rounded-md bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200/60 p-3 text-slate-500">
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
                  className="w-full rounded-md border border-solid border-slate-200 px-2 py-2 text-sm shadow-sm"
                  placeholder="Tìm kiếm theo tên lớp"
                />
                <Search className="absolute right-3 top-2.5 size-4 text-slate-600" />
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
        <div className="mt-2 w-full">
          <div className="float-right flex items-center gap-2">
            <div className="rounded-md bg-slate-200 px-8 py-2 text-sm font-semibold text-gray-600 hover:cursor-pointer hover:bg-slate-100">
              Hủy
            </div>
            <div className="rounded-md bg-blue-800 px-8 py-2 text-sm font-semibold text-white hover:cursor-pointer hover:bg-blue-700">
              Lưu
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherGroup;
