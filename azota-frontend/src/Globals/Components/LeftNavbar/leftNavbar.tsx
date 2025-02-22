import Logo from "../../../logo.svg";
import { LuFile, LuHouse } from "react-icons/lu";
import { LuFileText } from "react-icons/lu";
import { LuFolder } from "react-icons/lu";
import { LuLayers } from "react-icons/lu";
import { LuUsers } from "react-icons/lu";
import { LuBookOpen } from "react-icons/lu";
import { LuSettings } from "react-icons/lu";
import { NavLink } from "react-router-dom";

const TABS = [
  { icon: LuHouse, link: "/teacher/dashboard" },
  { icon: LuFileText, link: "/teacher/homework/management" },
  { icon: LuFolder, link: "/teacher/exam/management" },
  { icon: LuLayers, link: "/teacher/class/management" },
  { icon: LuUsers, link: "/teacher/teacher-group" },
  { icon: LuBookOpen, link: "/document-market/list-document" },
];

const LeftNavbar = () => {
  return (
    <nav className="hidden h-screen w-24 bg-blue-800 dark:bg-[#1b253b] md:block">
      <div className="flex flex-col items-center pt-5">
        <img src={Logo} alt="" className="w-10" />
        <div className="mt-9 space-y-1">
          {TABS.map((tab, index) => (
            <NavLink
              key={index}
              className={({ isActive }) =>
                `block px-6 py-3 ${isActive ? "rounded-l-full bg-white text-blue-800" : "text-white"}`
              }
              to={tab.link}
            >
              <tab.icon className="size-6" />
            </NavLink>
          ))}
        </div>

        <div className="mt-60 px-6 py-4 hover:cursor-pointer">
          <LuSettings className="size-6 text-white" />
        </div>
      </div>
    </nav>
  );
};

export default LeftNavbar;
