import AuthLayout from "../../Globals/Layouts/authLayout";
import CommonLayout from "../../Globals/Layouts/teacherLayout";
import AccountSetting from "./AccountSetting/accountSetting";
import Login from "./Login/login";
import Register from "./Register/register";

const AuthRoutes = {
  path: "auth",
  children: [
    {
      path: "",
      element: <AuthLayout />,
      children: [
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
      ],
    },
    {
      path: "account-setting",
      element: <CommonLayout />,
      children: [{ path: "", element: <AccountSetting /> }],
    },
  ],
};

export default AuthRoutes;
