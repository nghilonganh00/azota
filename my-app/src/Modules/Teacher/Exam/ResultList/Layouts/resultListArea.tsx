import {
  AlignJustify,
  Camera,
  Filter,
  PanelRightClose,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";
import StudentResultList from "../Components/studentResultList";
import { ClassGroup, ExamInfo, StudentResult } from "../libs/interface";
import AssignedByClass from "./assignedByClass";
import AssignedByStudent from "./assignedByStudent";
import ClassGroupAPI from "../../../../../API/classGroupAPI";

interface ResultListAreaProps {
  examInfo: ExamInfo;
  studentResults: StudentResult[];
}

const ResultListArea: React.FC<ResultListAreaProps> = (props) => {
  const { examInfo, studentResults } = props;
  const { examObj } = examInfo || {};

  const [classGroups, setClassGroups] = useState<ClassGroup[]>([]);

  const renderResultListContent = () => {
    const components = {
      ALL: <StudentResultList studentResults={studentResults} />,
      CLASS: <AssignedByClass classGroups={classGroups} />,
      STUDENT: <AssignedByStudent classGroups={classGroups} />,
    };

    return components[examObj?.examAssignType] || null;
  };

  const fetchClassGroupData = async () => {
    const data = await ClassGroupAPI.getAll();
    setClassGroups(data);
  };

  useEffect(() => {
    fetchClassGroupData();
  }, []);

  return (
    <div className="col-span-8 h-96 md:col-span-9">
      <div className="rounded-md bg-white p-2 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="max-w-min rounded-md border border-slate-300 p-2 shadow-sm">
            <PanelRightClose
              className="size-4 text-slate-800"
              strokeWidth={1}
            />
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
              <span className="text-xs font-semibold text-gray-600">
                Bộ lọc
              </span>
            </div>

            <div className="rounded-md border border-gray-300 px-2 py-1.5 hover:cursor-pointer">
              <AlignJustify className="size-4 text-gray-500" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between py-4">
        <div className="text-sm font-medium">Danh sách đã thi (2/2)</div>
        <div className="flex items-center gap-2 rounded-md bg-orange-500/15 px-2 py-1 shadow-sm">
          <Camera className="size-4 text-orange-500" strokeWidth={1.5} />
          <div className="text-sm font-medium text-orange-500">
            Chấm File Scan
          </div>
        </div>
      </div>

      {renderResultListContent()}
    </div>
  );
};

export default ResultListArea;
