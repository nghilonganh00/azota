import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "../../../../Assets/icons/google.svg";
import { useState, useEffect } from "react";
import AuthAPI from "../../../../API/authAPI";
import { useNavigate } from "react-router";
import { User } from "../../../../Globals/Interfaces/userInterface";

const LoginByGoogleButton = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<TokenResponse | null>(null);

  const handleLoginByGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    const loginByGoogle = async () => {
      if (user) {
        const response = await AuthAPI.loginByGoogle(user.access_token);
        const responseObj = await response?.json();
        const userObj: User = responseObj.data.userObj;
        const accessToken = responseObj.data.accessToken;
        console.log("response login by google: ", responseObj.data);

        localStorage.setItem("userId", accessToken);

        if (userObj.userRole === "TEACHER") {
          navigate("/teacher/dashboard");
        } else {
          navigate("/student/classroom");
        }
      }
    };

    loginByGoogle();
  }, [user]);

  return (
    <div
      onClick={() => handleLoginByGoogle()}
      className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 py-2 shadow-sm hover:cursor-pointer hover:bg-slate-100"
    >
      <img src={GoogleIcon} alt="" className="size-4" />
      <div className="text-sm font-medium text-gray-600">Google</div>
    </div>
  );
};

export default LoginByGoogleButton;
