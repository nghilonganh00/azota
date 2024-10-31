import { ClassGroup } from "../libs/interface";
import ClassroomPopup from "./classPopup";

interface ClassGroupStudentItemProps {
  classGroup: ClassGroup;
  assignedStudentIds: number[];
  setAssignedStudentIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const ClassGroupStudentItem: React.FC<ClassGroupStudentItemProps> = (props) => {
  const { classGroup, assignedStudentIds, setAssignedStudentIds } = props;
  const { classGroupName, Classes } = classGroup;

  return (
    <div className="p-2">
      <div className="text-sm">
        <span className="font-bold text-gray-700">{classGroupName}</span>
        <span>(0/2 lớp) </span>
        <span className="font-medium text-blue-500">Chọn tất cả lớp</span>
      </div>

      <div className="mt-4 grid grid-cols-12">
        {Classes.map((classroom, key) => (
          <ClassroomPopup
            key={key}
            classroom={classroom}
            assignedStudentIds={assignedStudentIds}
            setAssignedStudentIds={setAssignedStudentIds}
          />
        ))}
      </div>
    </div>
  );
};

export default ClassGroupStudentItem;
