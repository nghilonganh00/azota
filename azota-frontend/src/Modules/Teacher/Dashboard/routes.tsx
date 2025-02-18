import CommonLayout from "../../../Globals/Layouts/teacherLayout";
import Dashboard from "./dashboard";

const DashboardRoutes = {
  path: "",
  element: <CommonLayout />,
  children: [
    { path: "", element: <Dashboard /> },
    {
      path: "dashboard",
      element: <Dashboard />,
    },
  ],
};

export default DashboardRoutes;
