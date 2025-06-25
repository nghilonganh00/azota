import { useState, useEffect } from "react";
import UserAPI from "../../../API/userAPI";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  // const [searchParams] = useSearchParams();
  // const token = searchParams.get("token");

  const token = localStorage.getItem("accessToken");

  const handleUserRedirect = async () => {
    const response = await UserAPI.getInfo();
    if (!response) {
      return navigate("/auth/login", { replace: true });
    }

    const user = response?.data;

    if (user.role === "TEACHER") {
      navigate("/teacher/dashboard");
    } else {
      navigate("/student/classroom");
    }
  };

  useEffect(() => {
    if (token) {
      handleUserRedirect();
    }
    else {
      navigate("/auth/login", { replace: true });
    }
  }, []);

  return <div>Homepage</div>;
};

export default HomePage;
