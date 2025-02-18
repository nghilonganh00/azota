import CommonLayout from "../../../Globals/Layouts/teacherLayout";
import ClassDetail from "./ClassDetail/classDetail";
import ClassManage from "./ClassManage/classManage";

const ClassRoutes = {
  path: "class",
  element: <CommonLayout />,
  children: [
    { path: "management", element: <ClassManage /> },
    { path: "classroom-detail/:classId", element: <ClassDetail /> },
  ],
};

export default ClassRoutes;
