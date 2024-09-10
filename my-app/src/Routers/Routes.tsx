import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import GeneralRoutes from "../Modules/General/Routes";
import TeacherRoutes from "../Modules/Teacher/Routes";
import StudentRoutes from "../Modules/Student/routes";
import AuthRoutes from "../Modules/Auth/routes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { ...GeneralRoutes },
      { ...TeacherRoutes },
      { ...StudentRoutes },
      { ...AuthRoutes },
    ],
  },
]);
