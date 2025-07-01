import { ArrowRightLeft, LogOut, Moon, QrCode, RefreshCcw, ScanLine, ShieldCheck, UserIcon } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAPI from "../../../API/userAPI";
import { TeacherAPI } from "../../../API/teacherAPI";
import { User } from "../../Interfaces/user.interface";
import { UserRole } from "../../Constant/constant";
import AuthAPI from "../../../API/authAPI";
import UserAvatar from "../userAvatar";

interface MenuItemProps {
  icon: any;
  label: string;
  onClick?: () => void;
  to?: string;
  className?: string;
}

interface RoleActionProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon: Icon, label, onClick, to, className = "" }) => {
  const baseClasses =
    "flex items-center gap-3 rounded-md p-2 hover:cursor-pointer hover:bg-slate-200 hover:font-medium dark:hover:bg-darkmode-400";

  if (to) {
    return (
      <Link to={to} className={`${baseClasses} ${className}`}>
        <Icon strokeWidth={1.5} className="size-4" />
        <div className="text-sm">{label}</div>
      </Link>
    );
  }

  return (
    <div onClick={onClick} className={`${baseClasses} ${className}`}>
      <Icon strokeWidth={1.5} className="size-4" />
      <div className="text-sm">{label}</div>
    </div>
  );
};

const RoleAction: React.FC<RoleActionProps> = ({ onClick, label }) => (
  <MenuItem icon={ShieldCheck} label={label} onClick={onClick} />
);

const Menu = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({} as User);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [theme, setTheme] = useState(() => localStorage.getItem("currentTheme") || "light");
  const [isLoading, setIsLoading] = useState(false);

  const isTeacherView = window.location.pathname.startsWith("/teacher");
  const isTeacher = user.role === UserRole.TEACHER;

  const handleRefresh = useCallback(() => {
    window.location.reload();
  }, []);

  const handleToggleTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("currentTheme", newTheme);
    setTheme(newTheme);
  }, [theme]);

  const handleRemoveTeacherRole = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await UserAPI.removeTeacherRole();
      if (response?.status === 200) {
        navigate("/student/classroom");
      }
    } catch (error) {
      console.error("Error removing teacher role:", error);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleRegisterTeacherRole = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await TeacherAPI.register();

      if (response?.status === 200) {
        navigate("/teacher/dashboard");
      }
    } catch (error) {
      console.error("Error registering teacher role:", error);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const handleLogout = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await AuthAPI.logout();

      if (response?.status === 204) {
        localStorage.removeItem("accessToken");
        navigate("/auth/login", { replace: true });
      }
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const fetchUserInfo = useCallback(async () => {
    try {
      const response = await UserAPI.getInfo();

      if (response?.status === 200) {
        setUser(response.data);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  const renderRoleSwitch = () => {
    if (isTeacherView) {
      return <MenuItem icon={ArrowRightLeft} label="Vào màn hình học sinh" to="/student/classroom" />;
    }

    if (isTeacher) {
      return <MenuItem icon={ArrowRightLeft} label="Vào màn hình giáo viên" to="/teacher/dashboard" />;
    }

    return null;
  };

  const renderRoleAction = () => {
    if (isTeacher) {
      return <RoleAction onClick={handleRemoveTeacherRole} label="Bỏ quyền giáo viên" />;
    }

    return <RoleAction onClick={handleRegisterTeacherRole} label="Đăng ký quyền giáo viên" />;
  };

  return (
    <div
      className="relative z-10 flex items-center gap-2 pr-4"
      onMouseEnter={() => setDropdownVisible(true)}
      onMouseLeave={() => setDropdownVisible(false)}
    >
      {user?.fullname && <UserAvatar fullname={user.fullname} />}

      <div>
        <div className="text-sm font-medium text-slate-800 dark:text-gray-300">{user.fullname}</div>
        <div className="text-xs text-slate-500 dark:text-slate-400">{isTeacher ? "Giáo viên" : "Học sinh"}</div>
      </div>

      {isDropdownVisible && (
        <div
          className="absolute right-0 top-9 w-56 rounded-md bg-white shadow-md dark:bg-darkmode-600 dark:text-slate-300"
          id="menu-dropdown"
          onClick={() => setDropdownVisible(false)}
        >
          <div className="border-b border-gray-100 p-2 dark:border-darkmode-400">
            <MenuItem icon={UserIcon} label="Tài Khoản" to="/auth/account-setting" />

            {renderRoleSwitch()}

            <MenuItem icon={Moon} label="Chế độ tối" onClick={handleToggleTheme} />

            <MenuItem icon={RefreshCcw} label="Refresh" onClick={handleRefresh} />

            {renderRoleAction()}
          </div>

          <div className="p-2">
            <MenuItem icon={ScanLine} label="QR đăng nhập" to="/auth/login-qrcode" />

            <MenuItem icon={QrCode} label="Tạo QR quên mật khẩu" to="" />

            <MenuItem
              icon={LogOut}
              label="Đăng xuất"
              onClick={handleLogout}
              className={isLoading ? "cursor-not-allowed opacity-50" : ""}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
