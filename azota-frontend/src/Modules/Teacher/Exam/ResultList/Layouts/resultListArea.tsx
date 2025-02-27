import { AlignJustify, Camera, Filter, PanelLeftClose, PanelRightClose, Search } from "lucide-react";
import { useEffect, useState } from "react";
import StudentResultList from "../Components/studentResultList";
import { ClassGroup, StudentResult } from "../libs/interface";
import AssignedByClass from "./assignedByClass";
import AssignedByStudent from "./assignedByStudent";
import ClassGroupAPI from "../../../../../API/classGroupAPI";
import { Exam } from "../../../../../Globals/Interfaces/exam.interface";

interface ResultListAreaProps {
  exam: Exam;
  studentResults: StudentResult[];
  isOpenInfoArea: boolean;
  setOpenInfoArea: React.Dispatch<React.SetStateAction<boolean>>;
}

const ResultListArea: React.FC<ResultListAreaProps> = (props) => {
  const { exam, studentResults, isOpenInfoArea, setOpenInfoArea } = props;

  const [classGroups, setClassGroups] = useState<ClassGroup[]>([]);

  const renderResultListContent = () => {
    const components = {
      ALL: <StudentResultList studentResults={studentResults} />,
      CLASS: <AssignedByClass classGroups={classGroups} />,
      STUDENT: <AssignedByStudent classGroups={classGroups} />,
    };

    return components[exam?.assignType] || null;
  };

  const fetchClassGroupData = async () => {
    const response = await ClassGroupAPI.getAll();

    if (response?.status !== 200) return;

    setClassGroups(response.data);
  };

  useEffect(() => {
    fetchClassGroupData();
  }, []);

  return (
    <div className={`${isOpenInfoArea ? "col-span-8 h-96 md:col-span-9" : "col-span-12"} transition-all duration-300`}>
      <div className="rounded-md bg-white p-2 shadow-sm dark:bg-darkmode-600">
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="max-w-min rounded-md border border-slate-300 p-2 shadow-sm dark:border-darkmode-400"
            onClick={() => setOpenInfoArea((preValue) => !preValue)}
          >
            {isOpenInfoArea ? (
              <PanelLeftClose className="size-4 text-slate-800 dark:text-slate-300" strokeWidth={1} />
            ) : (
              <PanelRightClose className="size-4 text-slate-800 dark:text-slate-300" strokeWidth={1} />
            )}
          </button>

          <div className="flex items-center gap-2">
            <div className="relative border-gray-300">
              <input
                type="text"
                className="w-56 rounded-md border border-gray-300 px-2 py-1 text-sm dark:border-none dark:bg-darkmode-800"
                placeholder="Tìm kiếm lớp"
              />
              <Search className="absolute right-2 top-2 size-4 text-slate-600" />
            </div>

            <div className="flex items-center gap-2 rounded-md border border-gray-300 px-2 py-1.5 text-sm font-semibold text-gray-600 shadow-sm hover:cursor-pointer hover:bg-slate-100 dark:border-darkmode-400 dark:text-slate-400">
              <Filter className="size-4" />
              <span className="text-xs font-semibold">Bộ lọc</span>
            </div>

            <div className="rounded-md border border-gray-300 px-2 py-1.5 hover:cursor-pointer dark:border-darkmode-400">
              <AlignJustify className="size-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="text-sm font-medium dark:text-slate-300">Danh sách đã thi (2/2)</div>
        <div className="flex items-center gap-2 rounded-md bg-orange-500/15 px-2 py-1 shadow-sm">
          <Camera className="size-4 text-orange-500" strokeWidth={1.5} />
          <div className="text-sm font-medium text-orange-500">Chấm File Scan</div>
        </div>
      </div>

      {renderResultListContent()}
    </div>
  );
};

export default ResultListArea;
