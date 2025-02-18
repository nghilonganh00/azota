import { useEffect, useState } from "react";
import { useParams } from "react-router";
import ReviewDetail from "./Layouts/reviewDetail";
import ExamResultAPI from "../../../../API/examResultAPI";
import { MarkedExamResult } from "./libs/interface";
import ExamAPI from "../../../../API/examAPI";
import { Exam } from "../../../../Globals/Interfaces/exam.interface";
import ReviewExamContent from "./Layouts/reviewExamContent";

const ExamReview = () => {
  const { examResultId } = useParams();

  const [examResult, setExamResult] = useState<MarkedExamResult | null>(null);
  const [history, setHistory] = useState<MarkedExamResult[]>([]);
  const [exam, setExam] = useState<Exam | null>(null);

  useEffect(() => {
    //Fetch the infomation of examResult, history of exam
    const fetchData = async () => {
      if (examResultId) {
        const examResultRes = await ExamResultAPI.getMark(examResultId);
        if (examResultRes?.status !== 200) return;

        const examResultData: MarkedExamResult = examResultRes.data;
        setExamResult(examResultData);

        const [examRes, historyRes] = await Promise.all([
          ExamAPI.getContent(examResultData.examId.toString()),
          ExamResultAPI.getHistory(examResultData.examId, examResultData.studentId),
        ]);
        if (historyRes?.status === 200) setHistory(historyRes.data);
        if (examRes?.status === 200) setExam(examRes.data);
      }
    };

    fetchData();
  }, [examResultId]);

  return (
    <div className="flex items-start gap-4 p-5">
      <ReviewDetail examReview={examResult} history={history} />
      {examResult && exam && <ReviewExamContent examResult={examResult} exam={exam} />}
    </div>
  );
};

export default ExamReview;
