import { Outlet } from "react-router";
import AuthTopBar from "../Components/TopBar/authTopBar";

const AuthLayout = () => {
  return (
    <div>
      <div className="flex h-screen overflow-y-hidden">
        <div className="flex flex-1 flex-col">
          <AuthTopBar />
          <div className="flex-1 overflow-y-scroll">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
