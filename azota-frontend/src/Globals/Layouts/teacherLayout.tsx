import { Outlet, useNavigate } from "react-router";
import LeftNavbar from "../Components/LeftNavbar/leftNavbar";
import TopBar from "../Components/TopBar/topBar";
import { MobileMenuBar } from "../Components/MenuBar/mobileMenuBar";

const CommonLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <LeftNavbar />
      <div className="grid h-full flex-1 grid-rows-[auto_1fr] overflow-hidden px-4">
        <MobileMenuBar />
        <div className="grid min-h-0 grid-rows-[auto_1fr] rounded-3xl dark:bg-[rgb(var(--color-darkmode-700))]">
          <TopBar />
          <div className="scrollbar h-full overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonLayout;
