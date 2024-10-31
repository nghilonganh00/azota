import { Outlet, useNavigate } from "react-router";
import TopBar from "../Components/TopBar/topBar";
import StudentLeftNavbar from "../Components/studentLeftNavbar";
import { useEffect } from "react";
import UserAPI from "../../API/userAPI";
import { User } from "../Interfaces/userInterface";

const StudentLayout = () => {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     const response = await UserAPI.getInfo();
  //     if (!response.ok) {
  //       console.log("fetch user data fail");
  //     } else {
  //       const responseObj = await response.json();
  //       const userObj: User = responseObj.data;
  //       if (userObj.userRole === "TEACHER") {
  //         navigate("/teacher/dashboard");
  //       }
  //     }
  //   };

  //   fetchUserData();
  // }, []);
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
