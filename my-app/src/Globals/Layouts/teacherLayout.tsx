import { Outlet, useNavigate } from "react-router";
import LeftNavbar from "../Components/LeftNavbar/leftNavbar";
import TopBar from "../Components/TopBar/topBar";
import { useEffect } from "react";
import UserAPI from "../../API/userAPI";
import { User } from "../Interfaces/userInterface";

const CommonLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await UserAPI.getInfo();
      if (!response.ok) {
        console.log("fetch user data fail");
      } else {
        const responseObj = await response.json();
        const userObj: User = responseObj.data;
        if (userObj.userRole === "STUDENT") {
          navigate("/student/classroom");
        }
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <LeftNavbar />
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default CommonLayout;
