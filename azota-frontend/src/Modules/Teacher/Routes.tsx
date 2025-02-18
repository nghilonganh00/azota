import DashboardRoutes from "./Dashboard/routes";
import HomeworkRoutes from "./Homework/Route";
import ExamRoutes from "./Exam/route";
import ClassRoutes from "./Class/routes";
import TeacherGroupRoutes from "./TeacherGroup/routes";
import Dashboard from "./Dashboard/dashboard";

const TeacherRoutes = {
  path: "teacher",
  children: [
    { ...DashboardRoutes },
    { ...HomeworkRoutes },
    { ...ExamRoutes },
    { ...ClassRoutes },
    { ...TeacherGroupRoutes },
  ],
};

export default TeacherRoutes;
