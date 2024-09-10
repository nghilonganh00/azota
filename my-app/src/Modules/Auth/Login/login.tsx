import { useState } from "react";
import { QrCode } from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import AuthAPI from "../../../API/authAPI";

import LoginByGoogleButton from "./Components/loginByGoogleButton";

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

  const handleChangeInput = (name: string, newValue: string) => {
    setValues((preValues) => ({ ...preValues, [name]: newValue }));
  };

  const handleLogin = async () => {
    const { username, password } = values;

    const response = await AuthAPI.login(username, password);

    if (response?.status === 200) {
      const responseObj = await response.json();
      console.log("response: ", responseObj);

      localStorage.setItem("userId", responseObj.data.accessToken);
      navigate("/teacher/dashboard");
    }
  };

  return (
    <div className="w-full pt-16">
      <form
        action=""
        className="mx-auto flex w-[510px] flex-col items-center space-y-4 rounded-md bg-white px-6 py-4 shadow"
      >
        <div className="text-2xl font-bold text-gray-800">Đăng nhập</div>
        <input
          value={values["username"]}
          name="username"
          onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
          type="text"
          className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm shadow-sm"
          placeholder="Nhập số điện thoại, email hoặc"
        />
        <div className="relative w-full">
          <input
            value={values["password"]}
            name="password"
            onChange={(e) => handleChangeInput(e.target.name, e.target.value)}
            type="password"
            className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm shadow-sm"
            placeholder="Mật khẩu"
          />
          {/* <EyeOff
            className="absolute right-2 top-2 text-gray-600"
            strokeWidth={1.5}
          /> */}
        </div>
        <div className="w-full">
          <div className="text-sm text-gray-800">Quên mật khẩu ?</div>
        </div>
        <div
          className="w-full rounded-md bg-blue-800 py-3 text-center hover:cursor-pointer hover:bg-blue-700"
          onClick={handleLogin}
        >
          <div className="text-sm font-semibold text-white">Đăng nhập</div>
        </div>
        <div className="flex items-center text-sm">
          <div className="">Bạn chưa có tài khoản?</div>
          <Link to={"/auth/register"} className="text-blue-800">
            Tạo một tài khoản mới
          </Link>
          <div className="px-2"> | </div>
          <div className="text-blue-800">Đăng kí cho Tổ chức</div>
        </div>
        <div className="text-sm text-gray-700">Hoặc</div>

        <div className="flex w-full items-center gap-2">
          <LoginByGoogleButton />

          <div className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 py-2 shadow-sm">
            <QrCode className="size-4 text-gray-600" />
            <div className="text-sm font-medium text-gray-600">Qrcode</div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
