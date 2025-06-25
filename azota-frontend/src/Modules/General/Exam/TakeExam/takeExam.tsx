import { useEffect, useState } from "react";
import QuestionBar from "./Layout/questionBar";
import TakeExamArea from "./Layout/takeExamArea";
import TakeExamHeader from "./Layout/takeExamHeader";
import { useNavigate, useParams } from "react-router";
import ExamAPI from "../../../../API/examAPI";
import ExamResultAPI from "../../../../API/examResultAPI";
import { Exam, ExamResult, Question } from "../../../../Globals/Interfaces/exam.interface";
import { ExamAnswer } from "../TakeTraining/libs/interface";

const TakeExam = () => {
  const navigate = useNavigate();

  const { hashId } = useParams();
  const examStartTime = new Date().toString();

  const [exam, setExam] = useState<Exam | null>(null);
  const [examAnswers, setExamAnswers] = useState<ExamAnswer[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);

  const handleSaveExamAnwers = async () => {
    if (!exam) return;

    const examAnswersString = JSON.stringify(examAnswers);
    console.log("exam: ", exam.hashId);
    console.log("examAnswersString: ", examAnswersString);
    const response = await ExamResultAPI.create(exam.hashId, examAnswersString, examStartTime);

    if (response?.status !== 201) return;

    return response.data;
  };

  const handleFinish = async () => {
    const newExamResult: ExamResult = await handleSaveExamAnwers();
    if (newExamResult) {
      navigate(`/exam/submit-exam/${newExamResult.id}`);
    }
  };

  useEffect(() => {
    const fetchExamData = async () => {
      if (hashId) {
        const response = await ExamAPI.getContentByHashId(hashId);

        if (response?.status !== 200) return;

        const examData: Exam = response.data;

        setExam(examData);
        setQuestions(() => {
          const questions = examData.questionParts.reduce((acc, questionPart) => {
            acc.push(...questionPart.questions);
            return acc;
          }, [] as Question[]);

          return questions;
        });
      }
    };

    fetchExamData();
  }, [hashId]);

  return (
    <div>
      <TakeExamHeader exam={exam} handleFinish={handleFinish} />

      <div className="grid h-screen grid-cols-12 gap-5 overflow-y-scroll px-2 pt-20">
        {exam && (
          <TakeExamArea questionParts={exam.questionParts} examAnswers={examAnswers} setExamAnswers={setExamAnswers} />
        )}

        {exam && <QuestionBar questions={questions} examAnswers={examAnswers} />}
      </div>
    </div>
  );
};

export default TakeExam;
