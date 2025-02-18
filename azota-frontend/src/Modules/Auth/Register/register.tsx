import { useState } from "react";
import { EyeOff, GraduationCap, User } from "lucide-react";
import GoogleIcon from "../../../Assets/icons/google.svg";
import RoleTabs from "./Components/roleTabs";
import { newUser } from "./interface";
import { Link, useNavigate } from "react-router-dom";
import AuthAPI from "../../../API/authAPI";
import { response } from "express";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<newUser>({
    userFullName: "",
    username: "",
    password: "",
    userRole: "STUDENT",
  });

  const handleChangeValues = (name: string, newValue: string) => {
    setValues((preValues) => ({ ...preValues, [name]: newValue }));
  };

  const handleRegister = async () => {
    const { userFullName, username, password, userRole } = values;

    const response = await AuthAPI.register(username, password, userFullName, userRole);

    if (response?.status === 201) {
      alert("Bạn đã đăng nhập thành công!");
      navigate("/auth/login");
    }
  };

  return (
    <div className="pt-16">
      <form
        action=""
        className="mx-auto flex w-[500px] flex-col items-center space-y-4 rounded-md bg-white px-4 py-6 shadow"
      >
        <div className="text-2xl font-bold text-gray-800">Đăng ký</div>

        <RoleTabs values={values} onChange={handleChangeValues} />

        <input
          type="text"
          className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm shadow-sm"
          placeholder="Họ tên"
          value={values["userFullName"]}
          name="userFullName"
          onChange={(e) => handleChangeValues(e.target.name, e.target.value)}
        />

        <input
          type="text"
          className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm shadow-sm"
          placeholder="Nhập phone hoặc email"
          value={values["username"]}
          name="username"
          onChange={(e) => handleChangeValues(e.target.name, e.target.value)}
        />

        <div className="relative w-full">
          <input
            type="password"
            className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm shadow-sm"
            placeholder="Mật khẩu"
            value={values["password"]}
            name="password"
            onChange={(e) => handleChangeValues(e.target.name, e.target.value)}
          />
          {/* <EyeOff
            className="absolute right-2 top-2 text-gray-600"
            strokeWidth={1.5}
          /> */}
        </div>

        <div className="text-sm font-medium text-gray-500">
          Bằng cách ấn vào nút "Đăng ký", tôi đồng ý với{" "}
          <span className="text-blue-800">Điều Khoản Sử Dụng và Chính Sách Bảo Mật của AZOTA.</span>
        </div>

        <div
          onClick={handleRegister}
          className="w-full rounded-md bg-blue-800 py-3 text-center hover:cursor-pointer hover:bg-blue-700"
        >
          <div className="text-sm font-semibold text-white">Đăng ký</div>
        </div>

        <div className="w-full text-sm font-semibold">
          <span className="text-gray-500">Bạn đã có tài khoản?</span>
          <Link to={"/auth/login"} className="ml-1 text-blue-800">
            Đăng nhập
          </Link>
        </div>

        <div className="text-sm text-gray-800">Hoặc</div>

        <div className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 py-2 shadow-sm">
          <img src={GoogleIcon} alt="" className="size-4" />
          <div className="text-sm font-semibold text-gray-600">Google</div>
        </div>
      </form>
    </div>
  );
};

export default Register;
