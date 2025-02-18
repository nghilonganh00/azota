import CommonLayout from "../../../Globals/Layouts/teacherLayout";
import AddHomework from "./AddHomework/addHomework";
import ConfigHomework from "./ConfigHomework/configHomework";
import HomeworkManage from "./DocumentManage/homeworkManage";
import MarkHomework from "./MarkHomework/markHomework";
import PublishHomework from "./PublishHomework/publishHomework";
import ResultsList from "./ResultsList/resultsList";

const HomeworkRoutes = {
  path: "homework",
  children: [
    {
      path: "mark-homework/homework-submission/:homeworkSubmissionId",
      element: <MarkHomework />,
    },
    {
      path: "",
      element: <CommonLayout />,
      children: [
        { path: "management", element: <HomeworkManage /> },
        { path: "add-new-homework", element: <AddHomework /> },
        {
          path: ":homeworkId/submissions",
          element: <ResultsList />,
        },
        { path: "config-homework/:homeworkId", element: <ConfigHomework /> },
        { path: "publish-homework/:homeworkId", element: <PublishHomework /> },
      ],
    },
  ],
};

export default HomeworkRoutes;
