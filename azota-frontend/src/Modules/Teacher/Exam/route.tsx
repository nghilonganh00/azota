import CommonLayout from "../../../Globals/Layouts/teacherLayout";
import EditorLayout from "../../../Globals/Layouts/editorLayout";
import AddExam from "./AddExam/addExam";
import Editor from "./Editor/editor";
import ExamManage from "./ExamManage/examManagement";
import ResultsList from "./ResultList/resultList";
import CreateExam from "./CreateExam/createExam";
import ActionOnlineOffline from "./ActionOnlineOffline/actionOnlineOffine";
import ConfigExamOnline from "./ConfigExamOnline/configExamOnline";
import PublishExam from "./PublishExam/publishExam";
import ExamReview from "./ExamReview/examReview";
import UpdateExam from "./UpdateExam/updateExam";

const ExamRoutes = {
  path: "exam",
  children: [
    {
      path: "",
      element: <CommonLayout />,
      children: [
        { path: "management", element: <ExamManage /> },
        { path: "add-new", element: <AddExam /> },
        { path: "exam-results-list/:examId", element: <ResultsList /> },
        { path: "update-exam/:hashId", element: <UpdateExam /> },
        {
          path: "action-online-offline/:hashId",
          element: <ActionOnlineOffline />,
        },
        {
          path: "config-exam-online/:examId",
          element: <ConfigExamOnline />,
        },
        {
          path: "publish-exam/:hashId",
          element: <PublishExam />,
        },
        { path: "exam-review/:examResultId", element: <ExamReview /> },
      ],
    },
    {
      path: "editor",
      element: <EditorLayout />,
      children: [
        { path: "", element: <Editor /> },
        { path: "create", element: <CreateExam /> },
      ],
    },
  ],
};

export default ExamRoutes;
