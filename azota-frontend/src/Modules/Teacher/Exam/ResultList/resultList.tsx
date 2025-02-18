import { useParams } from "react-router";
import { useEffect, useState } from "react";
import ExamAPI from "../../../../API/examAPI";
import { ExamInfo, StudentResult } from "./libs/interface";
import ExamInfoArea from "./Layouts/examConfigArea";
import ExamResultAPI from "../../../../API/examResultAPI";
import ResultListArea from "./Layouts/resultListArea";
import { AxiosResponse } from "axios";
import { Exam } from "../../../../Globals/Interfaces/exam.interface";

const ResultsList = () => {
  const { examId } = useParams();
  const [exam, setExam] = useState<Exam>({} as Exam);
  const [studentResults, setStudentResults] = useState<StudentResult[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (examId) {
        const response: AxiosResponse | null = await ExamAPI.getConfig(examId);
        setExam(response?.data);

        const examObj: Exam = response?.data;

        switch (examObj.assignType) {
          case "ALL":
            const response = await ExamResultAPI.getLatestByExamAndClass(examObj.id);

            if (response?.status !== 200) return;

            setStudentResults(response.data);
            break;

          case "CLASS":
            break;

          default:
            break;
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-5">
      <div className="grid grid-cols-12 gap-6">
        <ExamInfoArea exam={exam} setExam={setExam} />

        <ResultListArea exam={exam} studentResults={studentResults} />
      </div>
    </div>
  );
};

export default ResultsList;
