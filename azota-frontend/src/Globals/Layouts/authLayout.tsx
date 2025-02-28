import { Outlet } from "react-router";
import AuthTopBar from "../Components/TopBar/authTopBar";

const AuthLayout = () => {
  return (
    <div>
      <div className="flex h-screen overflow-y-hidden dark:bg-darkmode-700">
        <div className="flex flex-1 flex-col">
          <AuthTopBar />
          <div className="scrollbal flex-1 overflow-y-auto">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
