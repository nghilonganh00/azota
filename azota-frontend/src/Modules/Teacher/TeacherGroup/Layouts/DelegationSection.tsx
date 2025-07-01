import { ChevronDown, ChevronsDownUp, PanelLeftClose, Search } from "lucide-react";
import DelegationBox from "../Components/delegationBox";

const DelegationSection = () => {
    


  return (
    <div className="w-full space-y-2">
      <div className="rounded-md bg-white p-2 shadow-sm dark:bg-darkmode-600 dark:text-slate-300">
        <div className="max-w-min rounded-md border border-slate-200 p-2 shadow-sm dark:border-darkmode-300">
          <PanelLeftClose className="size-4 text-slate-700" strokeWidth={1} />
        </div>
      </div>

      <div className="rounded-md bg-white shadow-sm dark:bg-darkmode-600">
        <div className="flex items-center justify-between border-b border-slate-200/60 p-3 text-slate-500 dark:border-darkmode-300 dark:text-slate-300">
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
                className="w-full rounded-md border border-solid border-slate-200 px-2 py-2 text-sm shadow-sm dark:border-none dark:bg-darkmode-800"
                placeholder="Tìm kiếm theo tên lớp"
              />
              <Search className="absolute right-3 top-2.5 size-4 text-slate-600 dark:text-slate-300" />
            </div>
            <ChevronsDownUp className="text-slate-600 dark:text-slate-300" />
          </div>

          <div>
            <div className="flex items-center py-3 text-slate-600 dark:text-slate-300">
              <ChevronDown className="" />
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
          <div className="rounded-md bg-slate-200 px-8 py-2 text-sm font-semibold text-gray-600 hover:cursor-pointer hover:bg-slate-100 dark:bg-darkmode-400 dark:text-slate-300">
            Hủy
          </div>
          <div className="rounded-md bg-blue-800 px-8 py-2 text-sm font-semibold text-white hover:cursor-pointer hover:bg-blue-700">
            Lưu
          </div>
        </div>
      </div>
    </div>
  );
};

export default DelegationSection;
