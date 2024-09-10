import {
  AlignJustify,
  Camera,
  Filter,
  PanelRightClose,
  Search,
} from "lucide-react";
import ClassGroupPopup from "../Components/classGroupPopup";
import StudentResultCard from "../Components/studentResultCard";
import { ClassGroup } from "../../../Homework/AddHomework/libs/interfaces";
import { Class } from "../../../../../Globals/Interfaces/interface";
import { useEffect, useState } from "react";
import StudentResultList from "../Components/studentResultList";

interface ResultListAreaProps {
  classgroups: ClassGroup[];
}

const ResultListArea: React.FC<ResultListAreaProps> = (props) => {
  const { classgroups } = props;

  const [showedClassGroup, setShowClassGroup] = useState<ClassGroup>(
    {} as ClassGroup,
  );
  const [showedClassroom, setShowClassroom] = useState<Class | null>(null);

  useEffect(() => {
    if (classgroups?.length > 0) {
      setShowClassGroup(classgroups[0]);
      setShowClassroom(classgroups[0].Classes[0]);
    }
  }, [classgroups]);

  console.log("assigned classgroups: ", classgroups);

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

      <div className="rounded-md border-gray-300 bg-white p-3 pb-28 shadow-sm">
        <ClassGroupPopup
          showedClassGroup={showedClassGroup}
          setShowClassGroup={setShowClassGroup}
          classGroups={classgroups}
        />

        <div className="flex items-center">
          {showedClassGroup.Classes?.map((classroom, key) => (
            <div
              className="w-[20%] border-b-2 border-blue-800 py-3 text-center hover:cursor-pointer"
              key={key}
            >
              <div className="text-sm font-medium">{`${classroom.className}`}</div>
            </div>
          ))}
        </div>

        {showedClassroom && (
          <StudentResultList showedClassroom={showedClassroom} />
        )}
      </div>
    </div>
  );
};

export default ResultListArea;
