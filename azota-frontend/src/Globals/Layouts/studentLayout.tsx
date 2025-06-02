import { Outlet, useNavigate } from "react-router";
import TopBar from "../Components/TopBar/topBar";
import StudentLeftNavbar from "../Components/LeftNavbar/studentLeftNavbar";
import { useEffect } from "react";
import UserAPI from "../../API/userAPI";
import { User } from "../Interfaces/userInterface";

const StudentLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-y-hidden">
      <StudentLeftNavbar />
      <div className="flex flex-1 flex-col">
        <TopBar />
        <div className="flex-1 overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default StudentLayout;
