import { useState, useEffect } from "react";
import UserAPI from "../../../API/userAPI";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleGoogleOAuthCallback = async () => {
    const token = searchParams.get("token");

    if (token) {
      setIsProcessing(true);
      try {
        localStorage.setItem("accessToken", token);

        // Get user info to determine role and redirect
        const response = await UserAPI.getInfo();
        if (response?.status === 200) {
          const user = response.data;

          if (user.role === "TEACHER") {
            navigate("/teacher/dashboard");
          } else {
            navigate("/student/classroom");
          }
        } else {
          // If user info fetch fails, redirect to login
          navigate("/auth/login");
        }
      } catch (error) {
        console.error("Error processing Google OAuth callback:", error);
        navigate("/auth/login");
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleUserRedirect = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return navigate("/auth/login", { replace: true });
    }

    try {
      const response = await UserAPI.getInfo();
      if (!response) {
        return navigate("/auth/login", { replace: true });
      }

      const user = response.data;

      if (user.role === "TEACHER") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/student/classroom");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      navigate("/auth/login", { replace: true });
    }
  };

  useEffect(() => {
    // Check if this is a Google OAuth callback
    const token = searchParams.get("token");

    if (token) {
      handleGoogleOAuthCallback();
    } else {
      handleUserRedirect();
    }
  }, [searchParams]);

  if (isProcessing) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-lg font-semibold">Đang xử lý đăng nhập...</div>
          <div className="text-sm text-gray-600">Vui lòng chờ trong giây lát</div>
        </div>
      </div>
    );
  }

  return <div>Homepage</div>;
};

export default HomePage;
