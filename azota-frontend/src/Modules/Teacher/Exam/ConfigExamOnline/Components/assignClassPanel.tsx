import { Expand, Filter, PanelLeftClose, Search } from "lucide-react";
import ClassGroupBox from "./classGroupBox";
import { Classgroup } from "../../../../../Globals/Interfaces/info.interface";

interface AssignClassPanelProps {
  assignedclassrooms: number[];
  onChange: (assignClass: number) => void;
  classGroups: Classgroup[];
}

const AssignClassPanel: React.FC<AssignClassPanelProps> = (props) => {
  const { assignedclassrooms, onChange, classGroups } = props;

  return (
    <div className="flex items-center gap-4">
      <div className="h-96 rounded-md shadow">
        <div className="relative border-b border-gray-300 p-2">
          <input
            type="text"
            className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
            placeholder="Tìm kiếm theo tên lớp"
          />
          <Search className="absolute right-5 top-3.5 size-4 text-slate-600" />
        </div>

        <div className="p-2">
          <div className="rounded-md bg-blue-800 py-2 pl-2 pr-32 text-sm font-semibold text-white">Tất cả (0/2)</div>
        </div>
      </div>

      <div className="h-96 flex-1 rounded-md border border-gray-300 shadow-sm">
        <div className="rounded-md bg-white p-2 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="max-w-min rounded-md border border-slate-300 p-2 shadow-sm">
              <PanelLeftClose className="size-4 text-slate-800" strokeWidth={1} />
            </div>

            <div className="flex items-center gap-2">
              <div className="relative border-gray-300">
                <input
                  type="text"
                  className="w-56 rounded-md border border-gray-300 px-2 py-1 text-sm"
                  placeholder="Tìm kiếm lớp"
                />
                <Search className="absolute right-2 top-2 size-4 text-slate-600" />
              </div>

              <div className="flex items-center gap-2 rounded-md border border-gray-300 px-2 py-1.5 text-sm font-semibold shadow-sm hover:cursor-pointer hover:bg-slate-100">
                <Filter className="size-4 text-gray-500" />
                <span className="text-xs text-gray-500">Bộ lọc</span>
              </div>

              <Expand className="text-gray-500" />
            </div>
          </div>
        </div>

        <div>
          {classGroups.map((classgroup) => (
            <ClassGroupBox
              key={classgroup.id}
              assignedClassIds={assignedclassrooms}
              onChange={onChange}
              classgroup={classgroup}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AssignClassPanel;
