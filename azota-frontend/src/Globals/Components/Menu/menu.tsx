import { ArrowRightLeft, LogOut, Moon, QrCode, RefreshCcw, ScanLine, ShieldCheck, UserIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAPI from "../../../API/userAPI";
import { TeacherAPI } from "../../../API/teacherAPI";
import { User } from "../../Interfaces/user.interface";
import { UserRole } from "../../Constant/constant";

interface RoleActionProps {
  onClick: () => void;
  label: string;
}

const MENU_TABS = [
  { icon: UserIcon, label: "Tài Khoản", link: "/auth/account-setting" },
  { icon: ArrowRightLeft, label: "Vào màn học sinh", link: "/student/classroom" },
];

const AUTH_TABS = [
  { icon: ScanLine, label: "QR đăng nhập", link: "/auth/login-qrcode" },
  { icon: QrCode, label: "Tạo QR quên mật khẩu", link: "" },
];

const RoleAction: React.FC<RoleActionProps> = (props) => {
  const { onClick, label } = props;

  return (
    <div
      onClick={onClick}
      className="flex items-center gap-3 rounded-md p-2 hover:cursor-pointer hover:bg-slate-200 hover:font-medium"
    >
      <ShieldCheck strokeWidth={1.5} className="size-4" />
      <div className="text-sm">{label}</div>
    </div>
  );
};

const Menu = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({} as User);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("currentTheme") || "light");

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleRemoveTeacherRole = async () => {
    try {
      const response = await UserAPI.removeTeacherRole();
      if (response.ok) navigate("/student/classroom");
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleTheme = async () => {
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("currentTheme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("currentTheme", "dark");
    }

    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleRegisterTeacherRole = async () => {
    try {
      const response = await TeacherAPI.register();

      if (response && response.ok) {
        console.log("OK");
        navigate("/teacher/dashboard");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
  };

  useEffect(() => {
    const fetchUserInfoData = async () => {
      const response = await UserAPI.getInfo();

      if (response?.status !== 200) {
        return;
      }
      const userObj = response.data;
      setUser(userObj);
    };

    fetchUserInfoData();
  }, []);

  return (
    <div
      className="relative z-10 flex items-center gap-2 pr-4"
      onMouseEnter={() => setDropdownVisible(true)}
      onMouseLeave={() => setDropdownVisible(false)}
    >
      <img
        className="h-8 w-8 rounded-full"
        src="https://lh3.googleusercontent.com/a/ACg8ocJ_iFoqcbXAa93XLL5ekog96hEVyxgkeCD7oenQOr3efwaZiQ=s96-c"
      ></img>
      <div>
        <div className="text-sm font-medium text-slate-800 dark:text-gray-300">{user.fullName}</div>
        <div className="text-xs text-slate-500 dark:text-slate-400">
          {user.role === UserRole.TEACHER ? "Giáo viên" : "Học sinh"}
        </div>
      </div>

      {isDropdownVisible && (
        <div
          className="absolute right-0 top-9 w-56 rounded-md bg-white shadow-md"
          id="menu-dropdown"
          onClick={() => setDropdownVisible(false)}
        >
          <div className="border-b border-gray-100 p-2">
            {MENU_TABS.map((tab, key) => (
              <Link
                to={tab.link}
                key={key}
                className="flex items-center gap-3 rounded-md p-2 hover:cursor-pointer hover:bg-slate-200 hover:font-medium"
              >
                <tab.icon strokeWidth={1.5} className="size-4" />
                <div className="text-sm">{tab.label}</div>
              </Link>
            ))}

            <div
              className="flex items-center gap-3 rounded-md p-2 hover:cursor-pointer hover:bg-slate-200 hover:font-medium"
              onClick={handleToggleTheme}
            >
              <Moon strokeWidth={1.5} className="size-4" />
              <div className="text-sm">Chế độ tối</div>
            </div>

            <div className="flex items-center gap-3 rounded-md p-2 hover:cursor-pointer hover:bg-slate-200 hover:font-medium">
              <RefreshCcw strokeWidth={1.5} className="size-4" />
              <div className="text-sm" onClick={handleRefresh}>
                Refresh
              </div>
            </div>

            {user.role === UserRole.TEACHER ? (
              <RoleAction onClick={handleRemoveTeacherRole} label="Bỏ quyền giáo viên" />
            ) : (
              <RoleAction onClick={handleRegisterTeacherRole} label="Đăng ký quyền giáo viên" />
            )}
          </div>

          <div className="p-2">
            {AUTH_TABS.map((tab, key) => (
              <Link
                key={key}
                to={tab.link}
                className="flex items-center gap-3 rounded-md p-2 hover:cursor-pointer hover:bg-slate-200 hover:font-medium"
              >
                <tab.icon strokeWidth={1.5} className="size-4" />
                <div className="text-sm">{tab.label}</div>
              </Link>
            ))}

            <Link
              onClick={handleLogout}
              to={"/auth/login"}
              className="flex items-center gap-3 rounded-md p-2 hover:cursor-pointer hover:bg-slate-200 hover:font-medium"
            >
              <LogOut strokeWidth={1.5} className="size-4" />
              <div className="text-sm">Đăng xuất</div>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
