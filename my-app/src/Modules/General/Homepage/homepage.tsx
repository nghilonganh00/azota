import { useState, useEffect } from "react";
import UserAPI from "../../../API/userAPI";
import { useNavigate } from "react-router";
import { User } from "../../../Globals/Interfaces/userInterface";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const fetchInfoUserData = async () => {
      const response = await UserAPI.getInfo();

      const responseObj = await response.json();
      const user: User = responseObj.data;

      if (!response.ok || !user) {
        navigate("/auth/login");
      }
      
      if (user.userRole === "TEACHER") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/student");
      }
    };

    fetchInfoUserData();
  }, []);
  return <div></div>;
};

export default HomePage;
