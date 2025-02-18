import StudentLayout from "../../Globals/Layouts/studentLayout";
import Classroom from "./Classroom/classroom";
import Homework from "./Homework/homework";

const StudentRoutes = {
  path: "student",
  element: <StudentLayout />,
  children: [
    { path: "classroom", element: <Classroom /> },
    {
      path: "homework-submissions/:homeworkSubmissionId",
      element: <Homework />,
    },
  ],
};

export default StudentRoutes;
