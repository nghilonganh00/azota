import DocumentMarketRoutes from "./DocumentMarket/Routes";
import IdentifyStudent from "./Homework/IdentifyStudent/identifyStudent";
import ExamRoutes from "./Exam/Routes";
import HomePage from "./Homepage/homepage";
import StudentLayout from "../../Globals/Layouts/studentLayout";
import path from "path";
import Notification from "./Notification/notification";
import CommonLayout from "../../Globals/Layouts/teacherLayout";

const GeneralRoutes = {
  path: "",
  children: [
    { path: "/", element: <HomePage /> },
    { ...DocumentMarketRoutes },
    { ...ExamRoutes },
    {
      path: "",
      element: <CommonLayout />,
      children: [{ path: "notification", element: <Notification /> }],
    },
    {
      path: "",
      element: <StudentLayout />,
      children: [{ path: "homework/:hashId", element: <IdentifyStudent /> }],
    },
  ],
};

export default GeneralRoutes;
