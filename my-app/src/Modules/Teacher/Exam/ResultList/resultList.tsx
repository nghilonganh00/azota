import { useParams } from "react-router";
import { useEffect, useState } from "react";
import ExamAPI from "../../../../API/examAPI";
import { ExamInfo, StudentResult } from "./libs/interface";
import ExamInfoArea from "./Layouts/examConfigArea";
import ExamResultAPI from "../../../../API/examResultAPI";
import ResultListArea from "./Layouts/resultListArea";
import { Exam } from "../../../General/Exam/TakeTraining/libs/interface";

const ResultsList = () => {
  const { hashId } = useParams();
  const [examInfo, setExamInfo] = useState<ExamInfo>({} as ExamInfo);
  const [studentResults, setStudentResults] = useState<StudentResult[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (hashId) {
        const examInfoData = await ExamAPI.getConfigByHashId(hashId);
        setExamInfo(examInfoData);

        const examObj: Exam = examInfoData.examObj;
        sessionStorage.setItem("examId", examObj.id.toString());

        switch (examObj.examAssignType) {
          case "ALL":
            const examResultdata = await ExamResultAPI.getLatest(examObj.id);
            setStudentResults(examResultdata.examResults);
            break;

          case "CLASS":
            
            break;

          default:
            // Optional: Handle unexpected values
            break;
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-5">
      <div className="grid grid-cols-12 gap-6">
        <ExamInfoArea examInfo={examInfo} setExamInfo={setExamInfo} />

        <ResultListArea examInfo={examInfo} studentResults={studentResults} />
      </div>
    </div>
  );
};

export default ResultsList;
