import StudentAPI from "../../../../../API/studentAPI";
import StudentResultCard from "./studentResultCard";
import { useEffect, useState } from "react";
import { Class } from "../../../../../Globals/Interfaces/interface";
import { StudentResult } from "../libs/interface";

interface StudentResultListProps {
  showedClassroom: Class;
}

const StudentResultList: React.FC<StudentResultListProps> = (props) => {
  const { showedClassroom } = props;
  const examId = sessionStorage.getItem("examId");

  const [studentResults, setStudentResults] = useState<StudentResult[]>();

  useEffect(() => {
    const fetchResultListData = async () => {
      if (examId) {
        const data = await StudentAPI.getExamResult(
          examId.toString(),
          showedClassroom.id.toString(),
        );
        setStudentResults(data.data);
      }
    };

    fetchResultListData();
  }, [examId, showedClassroom]);
  return (
    <div className="mt-6 grid grid-cols-12 gap-4">
      {studentResults?.map((studentResult, key) => (
        <StudentResultCard studentResult={studentResult} key={key} />
      ))}
    </div>
  );
};

export default StudentResultList;
