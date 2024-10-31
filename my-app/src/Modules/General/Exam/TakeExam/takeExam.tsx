import { useEffect, useState } from "react";
import QuestionBar from "./Layout/questionBar";
import TakeExamArea from "./Layout/takeExamArea";
import { Exam, ExamAnswer } from "../TakeTraining/libs/interface";
import TakeExamHeader from "./Layout/takeExamHeader";
import { useNavigate, useParams } from "react-router";
import ExamAPI from "../../../../API/examAPI";
import {
  GroupedQuestionPart,
  Question,
} from "../../../Teacher/Exam/ExamReview/libs/interface";
import { groupQuestionsByPart } from "../../../Teacher/Exam/ExamReview/libs/utils";
import ExamResultAPI from "../../../../API/examResultAPI";
import { Option } from "../../../../Globals/Interfaces/interface";

const TakeExam = () => {
  const navigate = useNavigate();

  const { hashId } = useParams();
  const examStartTime = new Date().toString();

  const [exam, setExam] = useState<Exam>({} as Exam);
  const questionIds = exam?.Questions?.map((question) => question.id);
  const questionParts: GroupedQuestionPart[] =
    exam.Questions && groupQuestionsByPart(exam.Questions);
  const [examAnswers, setExamAnswers] = useState<ExamAnswer[]>([]);

  const handleSaveExamAnwers = async () => {
    if (!exam.id) return;

    const examAnswersString = JSON.stringify(examAnswers);
    const newExamResult = await ExamResultAPI.create(
      exam.id,
      examAnswersString,
      examStartTime,
    );

    return newExamResult;
  };

  const handleFinish = async () => {
    const newExamResult = await handleSaveExamAnwers();
    if (newExamResult) {
      navigate(`/exam/submit-exam/${newExamResult.id}`);
    }
  };

  useEffect(() => {
    const fetchExamData = async () => {
      if (hashId) {
        const data = await ExamAPI.getDetailByHashId(hashId);

        if (!data?.Questions?.length) return;

        setExam({
          ...data,
          Questions: data.Questions.sort(
            (question: Question) => question.rawIndex,
          ),
        });
      }
    };

    fetchExamData();
  }, [hashId]);

  return (
    <div>
      {Object.keys(exam).length > 0 && (
        <TakeExamHeader exam={exam} handleFinish={handleFinish} />
      )}

      <div className="grid h-screen grid-cols-12 gap-5 overflow-y-scroll px-2 pt-20">
        <TakeExamArea
          questionParts={questionParts}
          examAnswers={examAnswers}
          setExamAnswers={setExamAnswers}
        />

        <QuestionBar questions={exam.Questions} examAnswers={examAnswers} />
      </div>
    </div>
  );
};

export default TakeExam;
