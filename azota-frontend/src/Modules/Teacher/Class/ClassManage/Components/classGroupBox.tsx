import { ChevronDown, Search } from "lucide-react";
import ClassBox from "./classBox";
import { ClassGroup } from "../../../Homework/AddHomework/libs/interfaces";

interface ClassGroupBoxProps {
  classGroup: ClassGroup;
}

const ClassGroupBox: React.FC<ClassGroupBoxProps> = (props) => {
  const { classGroup } = props;

  return (
    <div>
      <div className="flex items-center py-3">
        <ChevronDown className="text-slate-600" />
        <div className="font-medium">{`${classGroup.classgroupName} (${classGroup?.classrooms?.length || 0} lớp)`}</div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {classGroup?.classrooms?.map((classroom) => (
          <ClassBox classroom={classroom} key={classGroup.id} />
        ))}
      </div>
    </div>
  );
};

export default ClassGroupBox;
