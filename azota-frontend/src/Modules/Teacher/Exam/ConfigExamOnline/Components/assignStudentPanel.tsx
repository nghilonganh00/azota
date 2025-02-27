import { Expand, Filter, PanelLeftClose, Search } from "lucide-react";
import ClassGroupStudentItem from "./classGroupStudentItem";
import { Classgroup } from "../../../../../Globals/Interfaces/info.interface";

interface AssignStudentPanelProps {
  classgroups: Classgroup[];
  assignedStudentIds: number[];
  setAssignedStudentIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const AssignStudentPanel: React.FC<AssignStudentPanelProps> = (props) => {
  const { classgroups, assignedStudentIds, setAssignedStudentIds } = props;

  return (
    <div className="flex items-center gap-4">
      <div className="h-96 rounded-md shadow">
        <div className="relative border-b border-gray-300 p-2 dark:border-darkmode-400">
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm dark:border-none dark:bg-darkmode-800"
            placeholder="Tìm kiếm theo tên lớp"
          />
          <Search className="absolute right-5 top-3.5 size-4 text-slate-600" />
        </div>

        <div className="p-2">
          <div className="rounded-md bg-blue-800 py-2 pl-2 pr-32 text-sm font-semibold text-white">Tất cả (0/2)</div>
        </div>
      </div>

      <div className="h-96 flex-1 rounded-md border border-gray-300 shadow-sm dark:border-darkmode-400">
        <div className="rounded-md bg-white p-2 shadow-sm dark:bg-darkmode-600">
          <div className="flex items-center justify-between">
            <div className="max-w-min rounded-md border border-slate-300 p-2 shadow-sm dark:border-darkmode-400">
              <PanelLeftClose className="size-4 text-slate-800 dark:text-slate-300" strokeWidth={1} />
            </div>

            <div className="flex items-center gap-2">
              <div className="relative border-gray-300">
                <input
                  type="text"
                  className="w-56 rounded-md border border-gray-300 px-2 py-1 text-sm dark:border-none dark:bg-darkmode-800"
                  placeholder="Tìm kiếm lớp"
                />
                <Search className="absolute right-2 top-2 size-4 text-slate-600 dark:text-slate-400" />
              </div>

              <div className="flex items-center gap-2 rounded-md border border-gray-300 px-2 py-1.5 text-sm font-semibold text-gray-500 shadow-sm hover:cursor-pointer hover:bg-slate-100 dark:border-darkmode-400 dark:text-slate-400">
                <Filter className="size-4" />
                <span className="text-xs">Bộ lọc</span>
              </div>

              <Expand className="text-gray-500" />
            </div>
          </div>
        </div>

        <div>
          {classgroups.map((classgroup) => (
            <ClassGroupStudentItem
              key={classgroup.id}
              classgroup={classgroup}
              assignedStudentIds={assignedStudentIds}
              setAssignedStudentIds={setAssignedStudentIds}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssignStudentPanel;
