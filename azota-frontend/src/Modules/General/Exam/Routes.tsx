import StudentLayout from "../../../Globals/Layouts/studentLayout";
import AnswerExam from "./AnswerExam/answerExam";
import { IdentifyStudent } from "./IdentifyStudent/identifyStudent";
import PreviewExam from "./PreviewExam/previewExam";
import SubmitExam from "./SubmitExam/submitExam";
import TakeExam from "./TakeExam/takeExam";
import TakeTraining from "./TakeTraining/takeTraining";

const ExamRoutes = {
  path: "exam",
  children: [
    {
      path: "",
      element: <StudentLayout />,
      children: [
        { path: ":hashId", element: <PreviewExam /> },
        { path: "submit-exam/:examResultId", element: <SubmitExam /> },
        { path: "answer-exam/:examResultId", element: <AnswerExam /> },
      ],
    },
    {
      path: "",
      // element: "",
      children: [
        { path: ":hashId/identify-student", element: <IdentifyStudent /> },
        { path: ":hashId/take-training", element: <TakeTraining /> },
        {
          path: ":hashId/take-exam",
          element: <TakeExam />,
        },
      ],
    },
  ],
};

export default ExamRoutes;
