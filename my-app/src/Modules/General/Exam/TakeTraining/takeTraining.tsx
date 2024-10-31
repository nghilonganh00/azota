import { useNavigate, useParams } from "react-router";
import { useState, useEffect, useRef } from "react";
import TakeExamArea from "./Layouts/takeExamArea";
import TakeExamAction from "./Layouts/takeExamAction";
import TakeExamHeader from "./Layouts/takeExamHeader";
import ExamAPI from "../../../../API/examAPI";
import ExamResultAPI from "../../../../API/examResultAPI";
import { Question } from "../../../Teacher/Exam/ExamReview/libs/interface";
import { Option } from "../../../../Globals/Interfaces/interface";
import { Exam, ExamAnswer, QuestionResult, ResultLog } from "./libs/interface";
import { OctagonAlert } from "lucide-react";
import CreateAnonymousAccount from "./Layouts/createAnonymousAccount";

const TakeTraining = () => {
  const { hashId } = useParams();
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState<string | null>(
    localStorage.getItem("user-token"),
  );
  const examStartTime = new Date().toString();

  const [exam, setExam] = useState<Exam>({} as Exam);
  const [examAnswers, setExamAnswers] = useState<ExamAnswer[]>([]);
  const [examingQuestion, setExamingQuestion] = useState<Question>(
    {} as Question,
  );
  const [examingQuestionId, setExamingQuestionId] = useState<number>(0);
  const [isShowPartName, setShowPartName] = useState(false);
  const [selectedOption, setSelectOption] = useState<Option | null>(null);
  const [questionResult, setQuestionResult] = useState<QuestionResult>({
    correct: false,
    firstTime: true,
  });
  const [isShowNoti, setShowNoti] = useState(false);
  const [resultLog, setResultLog] = useState<ResultLog>({});

  const elementRef = useRef(null);

  const toggleFullScreen = (element: HTMLElement): void => {
    if (!document.fullscreenElement) {
      element.requestFullscreen().catch((err) => {
        console.error(
          `Error attempting to enable full-screen mode: ${err.message}`,
        );
      });
    } else {
      document.exitFullscreen().catch((err) => {
        console.error(
          `Error attempting to exit full-screen mode: ${err.message}`,
        );
      });
    }
  };

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

  const handleNextQuestion = () => {
    if (examingQuestionId + 1 === exam?.Questions.length) {
      handleFinish();
      return;
    }

    const nextQuestion = exam.Questions[examingQuestionId + 1];
    setExamingQuestion(nextQuestion);
    setExamingQuestionId((prevId) => prevId + 1);

    setSelectOption(null);
    setQuestionResult({
      correct: false,
      firstTime: true,
    });
    setShowNoti(false);
  };

  const handleCheckAnswer = () => {
    if (!examingQuestion || !selectedOption) return;

    if (questionResult.firstTime) {
      setResultLog((preValue) => ({
        ...preValue,
        [examingQuestion?.rawIndex]: selectedOption?.isAnswer,
      }));

      setExamAnswers((pre) => [
        ...pre,
        {
          Answered: 1,
          QuestionId: examingQuestion.id,
          AnswerContent: [
            { Index: selectedOption.QuestionId, Content: selectedOption.key },
          ],
        },
      ]);
    }

    setQuestionResult({
      correct: selectedOption?.isAnswer,
      firstTime: false,
    });

    setShowNoti(true);
  };

  useEffect(() => {
    const fetchExamData = async () => {
      if (hashId) {
        const data = await ExamAPI.getDetailByHashId(hashId);

        if (!data?.Questions?.length) return;

        setExam(data);
        const firstQuestion: Question = data.Questions[0];
        setExamingQuestion(firstQuestion);

        if (firstQuestion.QuestionPart.id) {
          setShowPartName(true);
        }
      }
    };

    fetchExamData();
  }, [hashId]);

  if (!userToken) {
    return <CreateAnonymousAccount setUserToken={setUserToken} />;
  }

  return (
    <div ref={elementRef}>
      <TakeExamHeader exam={exam} handleFinish={handleFinish} />

      <TakeExamArea
        examingQuestion={examingQuestion}
        selectedOption={selectedOption}
        setSelectOption={setSelectOption}
        isShowPartName={isShowPartName}
      />

      <TakeExamAction
        exam={exam}
        examingQuestion={examingQuestion}
        questionResult={questionResult}
        selectedOption={selectedOption}
        handleCheckAnswer={handleCheckAnswer}
        handleNextQuestion={handleNextQuestion}
        isShowNoti={isShowNoti}
        setShowNoti={setShowNoti}
      />
    </div>
  );
};

export default TakeTraining;
