import { useState, useEffect } from "react";
import UserAPI from "../../../API/userAPI";
import { useNavigate } from "react-router";

const HomePage = () => {
  const navigate = useNavigate();

  const handleUserRedirect = async () => {
    const response = await UserAPI.getInfo();
    if (response?.status !== 200) {
      navigate("/auth/login");
      return;
    }

    const user = response?.data;

    if (user.role === "TEACHER") {
      navigate("/teacher/dashboard");
    } else {
      navigate("/student/classroom");
    }
  };

  useEffect(() => {
    handleUserRedirect();
  }, [navigate]);

  return <div></div>;
};

export default HomePage;
