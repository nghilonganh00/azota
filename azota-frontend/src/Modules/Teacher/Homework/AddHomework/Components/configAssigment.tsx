import { Expand, Filter, PanelLeftClose, Search } from "lucide-react";
import { ClassGroup, NewHomework } from "../libs/interfaces";
import ClassGroupBox from "./classGroupBox";

interface ConfigAssignmentProps {
  classgroups: ClassGroup[];
  values: NewHomework;
  onChange: (name: string, newValue: number[]) => void;
}

const ConfigAssignment: React.FC<ConfigAssignmentProps> = (props) => {
  const { classgroups, values, onChange } = props;

  return (
    <div className="grid grid-cols-12 gap-2">
      <div className="col-span-12">
        <label htmlFor="" className="text-sm font-semibold">
          Giao cho lớp
        </label>
      </div>

      <div className="col-span-3">
        <div className="h-96 rounded-md border border-gray-300 shadow-sm dark:border-[rgb(var(--color-darkmode-400))]">
          <div className="relative border-b border-gray-300 p-2 dark:border-[rgb(var(--color-darkmode-400))]">
            <input
              type="text"
              className="w-full rounded-md border border-gray-300 px-2 py-1 text-sm dark:border-none dark:bg-[rgb(var(--color-darkmode-800))]"
              placeholder="Tìm kiếm theo tên lớp"
            />
            <Search className="absolute right-5 top-3.5 size-4 text-slate-600" />
          </div>

          <div className="p-2">
            <ul className="space-y-2 px-2">
              <li className="rounded-md bg-blue-900 p-2 text-sm font-semibold text-white dark:bg-blue-700">{`Tất cả (${values["classroomIds"].length}/${classgroups.length})`}</li>

              {classgroups?.map((classgroup) => {
                return (
                  <li
                    key={classgroup.id}
                    className="rounded-md p-2 text-sm text-white"
                  >{`${classgroup.classgroupName}`}</li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className="col-span-9">
        <div className="h-96 rounded-md border border-gray-300 shadow-sm dark:border-[rgb(var(--color-darkmode-400))]">
          <div className="border-b border-gray-300 p-2 dark:border-[rgb(var(--color-darkmode-400))]">
            <div className="flex items-center justify-between">
              <div className="max-w-min rounded-md border border-slate-300 p-2 shadow-sm dark:border-[rgb(var(--color-darkmode-400))]">
                <PanelLeftClose className="size-4 text-slate-800" strokeWidth={1} />
              </div>

              <div className="flex items-center gap-2">
                <div className="relative border-gray-300 dark:border-[rgb(var(--color-darkmode-400))]">
                  <input
                    type="text"
                    className="w-56 rounded-md border border-gray-300 px-2 py-1 text-sm dark:border-none dark:border-[rgb(var(--color-darkmode-400))] dark:bg-[rgb(var(--color-darkmode-800))]"
                    placeholder="Tìm kiếm lớp"
                  />
                  <Search className="absolute right-2 top-2 size-4 text-slate-600" />
                </div>

                <div className="flex items-center gap-2 rounded-md border border-gray-300 px-2 py-1.5 text-sm font-semibold shadow-sm hover:cursor-pointer hover:bg-slate-100 dark:border-[rgb(var(--color-darkmode-400))]">
                  <Filter className="size-4 text-gray-500" />
                  <span className="text-xs font-semibold text-gray-600">Bộ lọc</span>
                </div>

                <Expand className="text-gray-500" />
              </div>
            </div>
          </div>

          <div>
            {classgroups.map((classgroup) => (
              <ClassGroupBox classgroup={classgroup} key={classgroup.id} values={values} onChange={onChange} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigAssignment;
