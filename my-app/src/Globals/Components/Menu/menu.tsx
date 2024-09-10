import {
  ArrowRightLeft,
  LogOut,
  Moon,
  QrCode,
  RefreshCcw,
  ScanLine,
  ShieldCheck,
  User,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserAPI from "../../../API/userAPI";
import { User as IUser, UserRole } from "../../Interfaces/userInterface";

interface RoleActionProps {
  onClick: () => void;
  label: string;
}

const MENU_TABS = [
  { icon: User, label: "Tài Khoản", link: "" },
  { icon: ArrowRightLeft, label: "Vào màn học sinh", link: "" },
  { icon: Moon, label: "Chế độ tối", link: "" },
  { icon: RefreshCcw, label: "Refresh", link: "" },
];

const AUTH_TABS = [
  { icon: ScanLine, label: "QR đăng nhập", link: "" },
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
  const [userRole, setUserRole] = useState<UserRole>("STUDENT");
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userId");
  };

  const handleRemoveTeacherRole = async () => {
    const updatedUser = await UserAPI.removeTeacherRole();
  };

  const handleRegisterTeacherRole = async () => {
    const updatedUser = await UserAPI.registerTeacherRole();
  };

  useEffect(() => {
    const fetchInfoUserData = async () => {
      const response = await UserAPI.getInfo();

      const responseObj = await response.json();
      const user: IUser = responseObj.data;

      if (!response.ok || !user) {
        navigate("/auth/login");
      }

      setUserRole(user.userRole);
    };

    fetchInfoUserData();
  }, []);

  return (
    <div
      className="relative z-10 flex items-center gap-2"
      onMouseEnter={() => setDropdownVisible(true)}
      onMouseLeave={() => setDropdownVisible(false)}
    >
      <img
        className="mat-mdc-tooltip-trigger dark:border-darkmode-400 mat-mdc-tooltip-disabled h-8 w-8 rounded-full border border-slate-200"
        src="https://lh3.googleusercontent.com/a/ACg8ocJ_iFoqcbXAa93XLL5ekog96hEVyxgkeCD7oenQOr3efwaZiQ=s96-c"
      ></img>
      <div>
        <div className="text-sm font-medium text-slate-800">
          B21DCCN687 - Lê Văn Thiện
        </div>
        <div className="text-xs text-slate-500">
          {userRole === "TEACHER" ? "Giáo viên" : "Học sinh"}
        </div>
      </div>

      {isDropdownVisible && (
        <div
          className="absolute left-0 top-9 w-56 rounded-md bg-white shadow-md"
          id="menu-dropdown"
        >
          <div className="border-b border-gray-100 p-2">
            {MENU_TABS.map((tab, key) => (
              <div
                key={key}
                className="flex items-center gap-3 rounded-md p-2 hover:cursor-pointer hover:bg-slate-200 hover:font-medium"
              >
                <tab.icon strokeWidth={1.5} className="size-4" />
                <div className="text-sm">{tab.label}</div>
              </div>
            ))}

            {userRole === "TEACHER" ? (
              <RoleAction
                onClick={handleRemoveTeacherRole}
                label="Bỏ quyền giáo viên"
              />
            ) : (
              <RoleAction
                onClick={handleRegisterTeacherRole}
                label="Đăng ký quyền giáo viên"
              />
            )}
          </div>

          <div className="p-2">
            {AUTH_TABS.map((tab, key) => (
              <Link
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
