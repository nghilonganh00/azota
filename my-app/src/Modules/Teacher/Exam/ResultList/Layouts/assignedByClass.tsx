import { useState, useEffect } from "react";
import ClassGroupPopup from "../Components/classGroupPopup";
import { ClassGroup, StudentResult } from "../libs/interface";
import StudentResultList from "../Components/studentResultList";
import ExamResultAPI from "../../../../../API/examResultAPI";
import { Class } from "../../../../../Globals/Interfaces/interface";

interface AssignedByClassProps {
  classGroups: ClassGroup[];
}

const AssignedByClass: React.FC<AssignedByClassProps> = (props) => {
  const { classGroups } = props;

  const examId = Number(sessionStorage.getItem("examId")) || null;

  const [showedClassGroup, setShowClassGroup] = useState<ClassGroup>(
    {} as ClassGroup,
  );
  const [showedClassroom, setShowClassroom] = useState<Class | null>(null);
  const [studentResults, setStudentResults] = useState<StudentResult[]>([]);

  const fetchResultListData = async () => {
    if (examId && showedClassroom) {
      const data = await ExamResultAPI.getAssignedByClassLatest(
        examId,
        showedClassroom.id,
      );

      setStudentResults(data);
    }
  };

  useEffect(() => {
    if (classGroups?.length > 0) {
      setShowClassGroup(classGroups[0]);
      setShowClassroom(classGroups[0].Classes[0]);
    }
  }, [classGroups]);

  useEffect(() => {
    fetchResultListData();
  }, [showedClassroom]);

  return (
    <div className="rounded-md border-gray-300 bg-white p-3 pb-28 shadow-sm">
      <ClassGroupPopup
        showedClassGroup={showedClassGroup}
        setShowClassGroup={setShowClassGroup}
        setShowClassroom={setShowClassroom}
        classGroups={classGroups}
      />

      <div className="flex items-center">
        {showedClassGroup.Classes?.map((classroom, key) => (
          <div
            className={`w-[20%] border-b-2 py-3 text-center hover:cursor-pointer ${showedClassroom?.id === classroom.id && "border-blue-800"}`}
            key={key}
            onClick={() => setShowClassroom(classroom)}
          >
            <div className="text-sm font-medium">{`${classroom.className}`}</div>
          </div>
        ))}
      </div>

      {showedClassroom && <StudentResultList studentResults={studentResults} />}
    </div>
  );
};

export default AssignedByClass;
