import GoogleIcon from "../../../../Assets/icons/google.svg";
import { useState } from "react";
import { useNavigate } from "react-router";

const LoginByGoogleButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginByGoogle = () => {
    setIsLoading(true);
    window.location.href = "http://localhost:8080/api/auth/google/login";
  };

  return (
    <button
      onClick={handleLoginByGoogle}
      disabled={isLoading}
      className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 py-2 shadow-sm transition-colors hover:cursor-pointer hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-darkmode-400 dark:hover:bg-darkmode-500"
    >
      <img src={GoogleIcon} alt="Google" className="size-4" />
      <div className="text-sm font-medium text-gray-600 dark:text-slate-300">
        {isLoading ? "Đang đăng nhập..." : "Google"}
      </div>
    </button>
  );
};

export default LoginByGoogleButton;
