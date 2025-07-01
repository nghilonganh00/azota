import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import GoogleIcon from "../../../Assets/icons/google.svg";
import RoleTabs from "./Components/roleTabs";
import { newUser } from "./interface";
import { Link, useNavigate } from "react-router-dom";
import AuthAPI from "../../../API/authAPI";
import GoogleRegisterButton from "./Components/GoogleRegisterButton";

const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState<newUser>({
    userFullName: "",
    username: "",
    password: "",
    userRole: "STUDENT",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!values.userFullName.trim()) {
      newErrors.userFullName = "Họ tên không được để trống";
    }

    if (!values.username.trim()) {
      newErrors.username = "Email hoặc số điện thoại không được để trống";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.username) && !/^[0-9]{10,11}$/.test(values.username)) {
      newErrors.username = "Vui lòng nhập email hoặc số điện thoại hợp lệ";
    }

    if (!values.password) {
      newErrors.password = "Mật khẩu không được để trống";
    } else if (values.password.length < 6 || values.password.length > 30) {
      newErrors.password = "Mật khẩu phải có độ dài từ 6-30 ký tự";
    } else {
      const hasUpperCase = /[A-Z]/.test(values.password);
      const hasLowerCase = /[a-z]/.test(values.password);
      const hasNumbers = /\d/.test(values.password);
      const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(values.password);

      if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
        newErrors.password = "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChangeValues = (name: string, newValue: string) => {
    setValues((prevValues) => ({ ...prevValues, [name]: newValue }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await AuthAPI.register(values.username, values.password, values.userFullName, values.userRole);

      if (response?.status === 201) {
        navigate("/auth/login");
      } else {
        setErrors({ general: "Đăng ký không thành công. Vui lòng thử lại." });
      }
    } catch (error) {
      setErrors({ general: "Có lỗi xảy ra. Vui lòng thử lại sau." });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16 dark:bg-darkmode-700">
      <div className="mx-auto max-w-md">
        <form className="rounded-lg bg-white p-8 shadow-lg dark:bg-darkmode-500" onSubmit={(e) => e.preventDefault()}>
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-slate-300">Đăng ký tài khoản</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-slate-300">Tạo tài khoản để bắt đầu sử dụng AZOTA</p>
          </div>

          <RoleTabs values={values} onChange={handleChangeValues} />

          <div className="mt-4 space-y-4">
            <div>
              <label
                htmlFor="userFullName"
                className="mb-1 block text-sm font-medium text-gray-700 dark:text-slate-300"
              >
                Họ tên
              </label>
              <input
                id="userFullName"
                type="text"
                className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-darkmode-400 dark:bg-darkmode-800 dark:text-slate-300 ${
                  errors.userFullName ? "border-red-600" : "border-gray-300"
                }`}
                placeholder="Nhập họ tên của bạn"
                value={values.userFullName}
                name="userFullName"
                onChange={(e) => handleChangeValues(e.target.name, e.target.value)}
                onKeyPress={handleKeyPress}
              />
              {errors.userFullName && <p className="mt-1 text-xs text-red-600">{errors.userFullName}</p>}
            </div>

            <div>
              <label htmlFor="username" className="mb-1 block text-sm font-medium text-gray-700 dark:text-slate-300">
                Email hoặc số điện thoại
              </label>
              <input
                id="username"
                type="text"
                className={`w-full rounded-lg border px-4 py-3 text-sm text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-darkmode-400 dark:bg-darkmode-800 dark:text-slate-300 ${
                  errors.username ? "border-red-600" : "border-gray-300"
                }`}
                placeholder="Nhập email hoặc số điện thoại"
                value={values.username}
                name="username"
                onChange={(e) => handleChangeValues(e.target.name, e.target.value)}
                onKeyPress={handleKeyPress}
              />
              {errors.username && <p className="mt-1 text-xs text-red-600">{errors.username}</p>}
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700 dark:text-slate-300">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={isShowPassword ? "text" : "password"}
                  className={`w-full rounded-lg border px-4 py-3 pr-12 text-sm text-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-darkmode-400 dark:bg-darkmode-800 dark:text-slate-300 ${
                    errors.password ? "border-red-600" : "border-gray-300"
                  }`}
                  placeholder="Tạo mật khẩu mạnh"
                  value={values.password}
                  name="password"
                  onChange={(e) => handleChangeValues(e.target.name, e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200"
                  onClick={() => setIsShowPassword(!isShowPassword)}
                >
                  {isShowPassword ? (
                    <Eye className="h-5 w-5" strokeWidth={1.5} />
                  ) : (
                    <EyeOff className="h-5 w-5" strokeWidth={1.5} />
                  )}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-600">{errors.password}</p>}
            </div>
          </div>

          {errors.general && (
            <div className="mt-4 rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
              <p className="text-sm text-red-600">{errors.general}</p>
            </div>
          )}

          <div className="mt-6">
            <button
              type="button"
              onClick={handleRegister}
              disabled={isLoading}
              className="flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-700 dark:hover:bg-blue-600 dark:focus:ring-offset-darkmode-500"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Đang đăng ký...
                </>
              ) : (
                "Đăng ký"
              )}
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-gray-600 dark:text-slate-400">
            Bằng cách đăng ký, bạn đồng ý với{" "}
            <Link to="/terms" className="text-blue-600 hover:underline dark:text-blue-400">
              Điều khoản sử dụng
            </Link>{" "}
            và{" "}
            <Link to="/privacy" className="text-blue-600 hover:underline dark:text-blue-400">
              Chính sách bảo mật
            </Link>{" "}
            của AZOTA.
          </div>

          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600 dark:text-slate-400">Đã có tài khoản? </span>
            <Link
              to="/auth/login"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
            >
              Đăng nhập
            </Link>
          </div>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-darkmode-400" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 dark:bg-darkmode-500 dark:text-slate-400">Hoặc</span>
              </div>
            </div>

            <GoogleRegisterButton />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
