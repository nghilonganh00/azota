import DocumentMarketRoutes from "./DocumentMarket/Routes";
import IdentifyStudent from "./IdentifyStudent/identifyStudent";
import ExamRoutes from "./Exam/Routes";
import HomePage from "./Homepage/homepage";

const GeneralRoutes = {
  path: "",
  children: [
    { path: "/", element: <HomePage /> },
    { ...DocumentMarketRoutes },
    { ...ExamRoutes },
    { path: "homework/:hashId", element: <IdentifyStudent /> },
  ],
};

export default GeneralRoutes;
