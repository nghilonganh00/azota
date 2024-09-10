import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import GoogleIcon from "../../../../Assets/icons/google.svg";
import { useState, useEffect } from "react";
import AuthAPI from "../../../../API/authAPI";
import { useNavigate } from "react-router";

interface Profile {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

const LoginByGoogleButton = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<TokenResponse | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

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
        console.log("response: ", response);
        if (response?.ok) {
          const responseObj = await response.json();
          const accessToken = responseObj.data.accessToken;

          localStorage.setItem("userId", accessToken);
          navigate("/teacher/dashboard");
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
