import StudentLayout from "../../../Globals/Layouts/studentLayout";
import AnswerExam from "./AnswerExam/answerExam";
import StartExam from "./StartExam/startExam";
import SubmitExam from "./SubmitExam/submitExam";
import TakeTraining from "./TakeTraining/takeTraining";

const ExamRoutes = {
  path: "exam",
  children: [
    {
      path: "",
      element: <StudentLayout />,
      children: [
        { path: ":hashId", element: <StartExam /> },
        { path: "submit-exam/:examResultId", element: <SubmitExam /> },
        { path: "answer-exam/:examResultId", element: <AnswerExam /> },
      ],
    },
    { path: "take-training/:hashId", element: <TakeTraining /> },
  ],
};

export default ExamRoutes;
