import GoogleIcon from "../../../../Assets/icons/google.svg";
import { useState } from "react";
import { useNavigate } from "react-router";

const GoogleRegisterButton = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegisterByGoogle = () => {
    setIsLoading(true);
    // Redirect to backend Google OAuth endpoint for registration
    window.location.href = "http://localhost:8080/api/auth/google/login";
  };

  return (
    <button
      type="button"
      onClick={handleRegisterByGoogle}
      disabled={isLoading}
      className="mt-4 flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-darkmode-400 dark:bg-darkmode-600 dark:text-slate-300 dark:hover:bg-darkmode-500 dark:focus:ring-offset-darkmode-500"
    >
      <img src={GoogleIcon} alt="Google" className="h-5 w-5" />
      {isLoading ? "Đang đăng ký..." : "Đăng ký với Google"}
    </button>
  );
};

export default GoogleRegisterButton;
