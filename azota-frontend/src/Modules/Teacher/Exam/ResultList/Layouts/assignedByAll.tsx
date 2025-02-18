import { useEffect, useState } from "react";
import StudentResultList from "../Components/studentResultList";
import { StudentResult } from "../libs/interface";
import ExamResultAPI from "../../../../../API/examResultAPI";

const AssignedByAll = () => {
  const examId = Number(sessionStorage.getItem("examId")) || null;

  const [studentResults, setStudentResults] = useState<StudentResult[]>([]);

  const fetchResultListData = async () => {
    if (examId) {
      const response = await ExamResultAPI.getLatestByExamAndClass(examId);

      setStudentResults(response?.data);
    }
  };

  useEffect(() => {
    fetchResultListData();
  }, []);

  return <StudentResultList studentResults={studentResults} />;
};

export default AssignedByAll;
