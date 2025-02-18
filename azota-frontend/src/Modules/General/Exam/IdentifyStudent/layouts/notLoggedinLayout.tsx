import { OctagonAlert } from "lucide-react";
import { Link } from "react-router-dom";

export const NotLoggedInLayout = () => {
  return (
    <div className="flex w-[440px] max-w-[70vw] flex-col items-center justify-center space-y-4 rounded bg-white px-3 py-10 shadow-md">
      <div className="flex items-center justify-center gap-2">
        <OctagonAlert strokeWidth={1.6} className="text-orange-500" />
        <div className="font-medium">Bạn cần phải đăng ký tài khoản để làm bài!</div>
      </div>

      <Link to={"/auth/register"} className="flex h-9 w-24 items-center justify-center rounded-md bg-blue-800">
        <div className="font-medium text-white">Đăng ký</div>
      </Link>

      <div className="text-xs font-semibold text-gray-400">Bạn đã có tài khoản?</div>

      <Link to={"/auth/login"} className="flex h-9 w-24 items-center justify-center rounded-md bg-blue-800">
        <div className="font-medium text-white">Đăng nhập</div>
      </Link>
    </div>
  );
};
