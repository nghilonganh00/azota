import { Expand, Filter, PanelLeftClose, Search } from "lucide-react";
import { ClassGroup } from "../../AddHomework/libs/interfaces";
import ClassGroupBox from "../Components/classGroupBox";
import { Homework } from "../../../../../Globals/Interfaces/homework.interface";

interface ConfigAssignmentProps {
  values: Homework;
  onChange: (name: string, newValue: number[]) => void;
  classGroups: ClassGroup[];
}

const ConfigAssignment: React.FC<ConfigAssignmentProps> = (props) => {
  const { values, onChange, classGroups } = props;

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-12">
        <label htmlFor="" className="text-sm font-semibold">
          Giao cho lớp
        </label>
      </div>

      <div className="col-span-3">
        <div className="h-96 rounded-md border border-gray-300 shadow-sm">
          <div className="relative border-b border-gray-300 p-2">
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm"
              placeholder="Tìm kiếm theo tên lớp"
            />
            <Search className="absolute right-5 top-3.5 size-4 text-slate-600" />
          </div>

          <div className="p-2">
            <div className="rounded-md bg-blue-900 p-2 text-sm font-semibold text-white">
              Tất cả (0/2)
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-9">
        <div className="h-96 rounded-md border border-gray-300 shadow-sm">
          <div>
            {/* {classGroups.map((classGroup, key) => (
              <ClassGroupBox
                key={key}
                values={values}
                onChange={onChange}
                classGroup={classGroup}
              />
            ))} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigAssignment;
