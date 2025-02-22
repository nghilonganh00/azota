import { Outlet, useNavigate } from "react-router";
import LeftNavbar from "../Components/LeftNavbar/leftNavbar";
import TopBar from "../Components/TopBar/topBar";
import { MobileMenuBar } from "../Components/MenuBar/mobileMenuBar";

const CommonLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <LeftNavbar />
      <div className="flex h-full flex-1 flex-col overflow-hidden px-4">
        <MobileMenuBar />
        <div className="dark:bg-[rgb(var(--color-darkmode-700))] rounded-3xl">
          <TopBar />
          <div className="flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonLayout;
