import { useState, useEffect } from "react";
import UserAPI from "../../../API/userAPI";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleUserRedirect = async () => {
    const response = await UserAPI.getInfo();
    if (!response) return;

    const user = response?.data;

    if (user.role === "TEACHER") {
      navigate("/teacher/dashboard");
    } else {
      navigate("/student/classroom");
    }
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem("accessToken", token);
      navigate("/", { replace: true });
    }

    handleUserRedirect();
  }, [token]);

  return <div></div>;
};

export default HomePage;
