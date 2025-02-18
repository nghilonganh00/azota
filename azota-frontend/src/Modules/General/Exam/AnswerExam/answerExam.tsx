import { useEffect, useState } from "react";
import ResultListArea from "../../../Teacher/Exam/ResultList/Layouts/resultListArea";
import AnswerArea from "./layouts/answerArea";
import ExamInfoArea from "./layouts/examInfoArea";
import { useParams } from "react-router";
import ExamResultAPI from "../../../../API/examResultAPI";
import { ExamReview } from "./libs/interface";

const AnswerExam = () => {
  const { examResultId } = useParams();
  const [examReview, setExamReview] = useState<ExamReview>({} as ExamReview);

  useEffect(() => {
    const fetchExamAnswerData = async () => {
      if (!examResultId) return;

      const data = await ExamResultAPI.getAnswer(examResultId);
      setExamReview(data);
    };

    fetchExamAnswerData();
  }, []);

  console.log("Exam result: ", examReview);

  return (
    <div className="p-5">
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-4 md:col-span-3">
          <ExamInfoArea examReview={examReview} />
        </div>

        <div className="col-span-8 md:col-span-9">
          <AnswerArea examReview={examReview} />
        </div>
      </div>
    </div>
  );
};

export default AnswerExam;
