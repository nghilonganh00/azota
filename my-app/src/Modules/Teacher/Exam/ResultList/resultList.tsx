import { useParams } from "react-router";
import { useEffect, useState } from "react";
import ExamAPI from "../../../../API/examAPI";
import { ExamInfo } from "./libs/interface";
import ExamInfoArea from "./Layouts/examConfigArea";
import ResultListArea from "./Layouts/resultListArea";
import StudentAPI from "../../../../API/studentAPI";

const ResultsList = () => {
  const { hashId } = useParams();
  const [examInfo, setExamInfo] = useState<ExamInfo>({} as ExamInfo);

  useEffect(() => {
    const fetchExamConfigData = async () => {
      if (hashId) {
        const data = await ExamAPI.getConfigByHashId(hashId);
        setExamInfo(data);
        console.log("data: ", data);
        sessionStorage.setItem("examId", data.examObj.id);
      }
    };

    fetchExamConfigData();
  }, []);
  console.log("exam config: ", examInfo);

  return (
    <div className="p-5">
      <div className="grid grid-cols-12 gap-6">
        <ExamInfoArea examInfo={examInfo} setExamInfo={setExamInfo} />

        <ResultListArea classgroups={examInfo.classGroupObjs} />
      </div>
    </div>
  );
};

export default ResultsList;
