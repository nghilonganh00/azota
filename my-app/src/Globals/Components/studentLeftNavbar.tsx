import Logo from "../../logo.svg";
import { LuLayers } from "react-icons/lu";
import { LuSettings } from "react-icons/lu";
import { NavLink } from "react-router-dom";

const TABS = [{ icon: LuLayers, link: "/student/classroom" }];

const StudentLeftNavbar = () => {
  return (
    <nav className="w-24 h-screen bg-blue-800">
      <div className="flex flex-col items-center pt-5 ">
        <img src={Logo} alt="" className="w-10" />
        <div className="mt-9 space-y-1">
          {TABS.map((tab, index) => (
            <NavLink
              key={index}
              className={({ isActive }) =>
                `block px-6 py-3 ${
                  isActive
                    ? "text-blue-800 bg-white rounded-l-full"
                    : "text-white"
                }`
              }
              to={tab.link}
            >
              <tab.icon className="size-6" />
            </NavLink>
          ))}
        </div>

        <div className="mt-[512px] px-6 py-4 hover:cursor-pointer">
          <LuSettings className="text-white size-6" />
        </div>
      </div>
    </nav>
  );
};

export default StudentLeftNavbar;