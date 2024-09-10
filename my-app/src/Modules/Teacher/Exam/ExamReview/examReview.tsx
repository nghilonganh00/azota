import { useEffect, useState, Fragment } from "react";
import { useParams } from "react-router";
import ReviewDetail from "./Layouts/reviewDetail";
import ReviewExamContent from "./Layouts/reviewExamContent";
import ExamResultAPI from "../../../../API/examResultAPI";
import { ExamReviewI } from "./libs/interface";

const ExamReview = () => {
  const { examResultId } = useParams();

  const [examReview, setExamReview] = useState<ExamReviewI>({} as ExamReviewI);

  useEffect(() => {
    const fetchExamReviewData = async () => {
      if (examResultId) {
        const data = await ExamResultAPI.getReview(examResultId);
        setExamReview(data);
        console.log("exam review data: ", data);
      }
    };

    fetchExamReviewData();
  }, [examResultId]);

  return (
    <div className="flex items-start gap-4 p-5">
      <ReviewDetail examReview={examReview} />
      <ReviewExamContent examReview={examReview} />
    </div>
  );
};

export default ExamReview;
