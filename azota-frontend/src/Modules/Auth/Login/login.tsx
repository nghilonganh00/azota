import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import AuthAPI from "../../../API/authAPI";

import LoginByGoogleButton from "./Components/loginByGoogleButton";
import LoginByQRCode from "./Components/loginByQRCode";
import { axiosInstance } from "../../../services/axiosInstance";
import UserAPI from "../../../API/userAPI";

interface LoginInfo {
  username: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState<LoginInfo>({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState<string>("");
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const handleChangeInput = (name: string, newValue: string) => {
    setValues((preValues) => ({ ...preValues, [name]: newValue }));
    setMessage("");
  };

  const handleLogin = async () => {
    const { username, password } = values;

    if (!username || !password) {
      setMessage("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    const response = await AuthAPI.login(username, password);

    if (response?.status === 200) {
      const loginData = response.data;
      console.log(loginData);

      if (loginData.accessToken) {
        localStorage.setItem("accessToken", loginData.accessToken);
      }

      navigate(loginData.user.role === "TEACHER" ? "/teacher/dashboard" : "/student/classroom");
    } else {
      setMessage("Tài khoản hoặc mật khẩu không chính xác");
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await UserAPI.getInfo();

        if (response?.status == 200) {
          navigate("/", { replace: true });
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="w-full pt-16">
      <form
        onSubmit={handleLogin}
        className="mx-auto flex w-[510px] flex-col items-center space-y-4 rounded-md bg-white px-6 py-4 shadow-lg dark:bg-darkmode-600 dark:text-slate-300"
      >
        <div className="text-2xl font-bold text-gray-800 dark:text-slate-300">Đăng nhập</div>
        <input
          value={values["username"]}
          name="username"
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          type="text"
          className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm shadow-sm"
          placeholder="Nhập số điện thoại, email hoặc username"
        />
        <div className="relative w-full">
          <input
            value={values["password"]}
            name="password"
            onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
            type={isShowPassword ? "text" : "password"}
            className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm text-gray-800 shadow-sm"
            placeholder="Mật khẩu"
          />
          <EyeOff
            className={`absolute right-2 top-2 text-gray-600 ${isShowPassword ? "hidden" : ""}`}
            strokeWidth={1.5}
            onClick={() => setIsShowPassword(!isShowPassword)}
          />
          <Eye
            className={`absolute right-2 top-2 text-gray-600 ${isShowPassword ? "" : "hidden"}`}
            strokeWidth={1.5}
            onClick={() => setIsShowPassword(!isShowPassword)}
          />
          <div className="mt-1 text-xs text-red-500">{message}</div>
        </div>
        <div className="w-full">
          <div className="text-sm text-gray-800 dark:text-slate-300">Quên mật khẩu ?</div>
        </div>
        <div
          className="w-full rounded-md bg-blue-800 py-3 text-center hover:cursor-pointer hover:bg-blue-700"
          onClick={handleLogin}
        >
          <div className="text-sm font-semibold text-white">Đăng nhập</div>
        </div>
        <div className="flex items-center text-sm text-blue-800 dark:text-blue-600">
          <div className="text-slate-400">Bạn chưa có tài khoản?</div>
          <Link to={"/auth/register"} className="">
            Tạo một tài khoản mới
          </Link>
          <div className="px-2"> | </div>
          <div className="">Đăng kí cho Tổ chức</div>
        </div>
        <div className="text-sm text-gray-700 dark:text-slate-400">Hoặc</div>

        <div className="flex w-full items-center gap-2">
          <LoginByGoogleButton />

          <LoginByQRCode />
        </div>
      </form>
    </div>
  );
};

export default Login;
