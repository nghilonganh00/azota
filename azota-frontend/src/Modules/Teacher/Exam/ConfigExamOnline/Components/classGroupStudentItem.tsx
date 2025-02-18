import { Classgroup } from "../../../../../Globals/Interfaces/info.interface";
import ClassroomPopup from "./classPopup";

interface ClassGroupStudentItemProps {
  classgroup: Classgroup;
  assignedStudentIds: number[];
  setAssignedStudentIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const ClassGroupStudentItem: React.FC<ClassGroupStudentItemProps> = (props) => {
  const { classgroup, assignedStudentIds, setAssignedStudentIds } = props;
  const { classgroupName, classrooms } = classgroup;

  const assignClassroomTotal = classgroup.classrooms.reduce((acc, classroom) => {
    const assignedClassroom = classroom.studentClasses.find((studentClass) =>
      assignedStudentIds?.includes(studentClass.id),
    );

    return acc + (assignedClassroom ? 1 : 0);
  }, 0);

  return (
    <div className="p-2">
      <div className="text-sm">
        <span className="font-bold text-gray-700">{classgroupName}</span>
        <span>{` ${assignClassroomTotal}/${classgroup.classrooms.length} lớp`} </span>
        <span className="font-medium text-blue-500">Chọn tất cả lớp</span>
      </div>

      <div className="mt-4 grid grid-cols-12">
        {classrooms.map((classroom, key) => (
          <ClassroomPopup
            key={classroom.id}
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
