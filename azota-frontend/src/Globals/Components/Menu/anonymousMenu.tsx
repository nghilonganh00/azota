import { CircleArrowRight, LogOut, Moon, RefreshCcw } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const MENU_TABS = [
  { icon: CircleArrowRight, label: "Đăng ký", link: "/auth/register" },
  { icon: LogOut, label: "Đăng nhập", link: "/auth/login" },
  { icon: Moon, label: "axiosInstance. tối", link: "" },
];

const AnonymousMenu = () => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
  };

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
        <div className="text-sm font-medium text-slate-800">Anonymous account</div>
        <div className="text-xs text-slate-500">Học sinh</div>
      </div>

      {isDropdownVisible && (
        <div className="absolute right-2 top-9 w-56 rounded-md bg-white shadow-md" id="menu-dropdown">
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

            <div className="flex items-center gap-3 rounded-md p-2 hover:cursor-pointer hover:bg-slate-200 hover:font-medium">
              <RefreshCcw strokeWidth={1.5} className="size-4" />
              <div className="text-sm" onClick={handleRefresh}>
                Refresh
              </div>
            </div>
          </div>

          <div className="p-2">
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

export default AnonymousMenu;
