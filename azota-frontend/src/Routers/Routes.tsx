import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import GeneralRoutes from "../Modules/General/Routes";
import TeacherRoutes from "../Modules/Teacher/Routes";
import StudentRoutes from "../Modules/Student/routes";
import AuthRoutes from "../Modules/Auth/routes";
import HomePage from "../Modules/General/Homepage/homepage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <HomePage /> },
      { ...GeneralRoutes },
      { ...TeacherRoutes },
      { ...StudentRoutes },
      { ...AuthRoutes },
    ],
  },
]);
