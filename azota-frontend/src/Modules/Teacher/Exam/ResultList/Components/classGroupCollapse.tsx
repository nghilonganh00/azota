import { ChevronDown } from "lucide-react";
import { ClassGroup } from "../libs/interface";
import { Classroom } from "../../../../../Globals/Interfaces/info.interface";

interface ClassGroupCollapseProps {
  classGroup: ClassGroup;
  handleSelectClassroom: (selectClassroom: Classroom) => void;
}

const ClassGroupCollapse: React.FC<ClassGroupCollapseProps> = (props) => {
  const { classGroup, handleSelectClassroom } = props;
  const { classgroupName, classrooms } = classGroup;

  return (
    <div className="">
      <div className="flex items-center">
        <ChevronDown strokeWidth={1.5} />
        <div className="text-sm font-medium">{`${classgroupName} (${classrooms.length} lớp)`}</div>
      </div>

      <div className="mt-3 grid grid-cols-12 gap-2">
        {classrooms.map((classroom) => {
          const { className, studentCount } = classroom;
          return (
            <div className="col-span-3" key={classroom.id} onClick={() => handleSelectClassroom(classroom)}>
              <div className="rounded-md bg-[#c1d9f159] p-4 hover:cursor-pointer">
                <div className="text-sm font-medium">{className}</div>
                <div className="mt-2 text-xs font-medium text-slate-500">{`Sĩ số: ${studentCount || 0}`}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ClassGroupCollapse;
