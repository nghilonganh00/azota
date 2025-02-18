import DocumentMarketRoutes from "./DocumentMarket/Routes";
import IdentifyStudent from "./Homework/IdentifyStudent/identifyStudent";
import ExamRoutes from "./Exam/Routes";
import HomePage from "./Homepage/homepage";
import StudentLayout from "../../Globals/Layouts/studentLayout";

const GeneralRoutes = {
  path: "",
  children: [
    { path: "/", element: <HomePage /> },
    { ...DocumentMarketRoutes },
    { ...ExamRoutes },
    {
      path: "homework/:hashId",
      element: <StudentLayout />,
      children: [{ path: "", element: <IdentifyStudent /> }],
    },
  ],
};

export default GeneralRoutes;
