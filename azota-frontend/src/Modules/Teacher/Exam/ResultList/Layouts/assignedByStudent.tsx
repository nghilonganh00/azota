import { useEffect, useState } from "react";
import StudentResultList from "../Components/studentResultList";
import { ClassGroup, StudentResult } from "../libs/interface";
import ExamResultAPI from "../../../../../API/examResultAPI";
import ClassGroupPopup from "../Components/classGroupPopup";
import { Classroom } from "../../../../../Globals/Interfaces/info.interface";

interface AssignedByStudentProps {
  classGroups: ClassGroup[];
}

const AssignedByStudent: React.FC<AssignedByStudentProps> = (props) => {
  const { classGroups } = props;

  const examId = Number(sessionStorage.getItem("examId")) || null;

  const [showedClassGroup, setShowClassGroup] = useState<ClassGroup>({} as ClassGroup);
  const [showedClassroom, setShowClassroom] = useState<Classroom | null>(null);
  const [studentResults, setStudentResults] = useState<StudentResult[]>([]);

  const fetchResultListData = async () => {
    if (examId && showedClassroom) {
      const data = await ExamResultAPI.getAssignedByClassLatest(examId, showedClassroom.id);

      setStudentResults(data);
    }
  };

  useEffect(() => {
    if (classGroups?.length > 0) {
      setShowClassGroup(classGroups[0]);
      setShowClassroom(classGroups[0].classrooms[0]);
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
        {showedClassGroup.classrooms?.map((classroom, key) => {
          const submitedStudentTotal = studentResults.map(
            (studentResult) => studentResult.classId === classroom.id,
          ).length;

          return (
            <div
              className={`w-[20%] border-b-2 py-3 text-center hover:cursor-pointer ${showedClassroom?.id === classroom.id && "border-blue-800"}`}
              key={key}
              onClick={() => setShowClassroom(classroom)}
            >
              <div className="text-sm font-medium">
                {`${classroom.className} ` +
                  (showedClassroom?.id === classroom.id ? `(${submitedStudentTotal}/${classroom.studentCount})` : "")}
              </div>
            </div>
          );
        })}
      </div>

      {showedClassroom && <StudentResultList studentResults={studentResults} />}
    </div>
  );
};

export default AssignedByStudent;
