import CommonLayout from "../../../Globals/Layouts/teacherLayout";
import TeacherGroup from "./teacherGroup";

const TeacherGroupRoutes = {
  path: "teacher-group",
  element: <CommonLayout />,
  children: [{ path: "", element: <TeacherGroup /> }],
};

export default TeacherGroupRoutes;
