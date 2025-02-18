import { Outlet, useNavigate } from "react-router";
import LeftNavbar from "../Components/LeftNavbar/leftNavbar";
import TopBar from "../Components/TopBar/topBar";

const AnonymousLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <LeftNavbar />
      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <TopBar />
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AnonymousLayout;
