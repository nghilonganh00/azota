import { Outlet } from "react-router";
import TopBar from "../Components/TopBar/topBar";
import StudentLeftNavbar from "../Components/studentLeftNavbar";

const StudentLayout = () => {
  return (
    <div className="flex h-screen overflow-y-hidden">
      <StudentLeftNavbar />
      <div className="flex-1 flex flex-col">
        <TopBar />
        <div className="flex-1 overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentLayout;
