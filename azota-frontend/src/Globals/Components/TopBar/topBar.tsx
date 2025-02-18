import { LuBell } from "react-icons/lu";
import Menu from "../Menu/menu";
import { ChevronLeft } from "lucide-react";
import useGoBack from "../../Hooks/useGoBack";
import AnonymousMenu from "../Menu/anonymousMenu";
import { useLocation, useNavigate } from "react-router";
import { useEffect } from "react";

const TopBar = () => {
  const goBack = useGoBack();
  const location = useLocation();
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");

  useEffect(() => {
    const pathParts = location.pathname.split("/");
    const firstSegment = pathParts[1];
    if (!accessToken) {
      if (["teacher", "student"].includes(firstSegment)) {
        console.log(`firstSegment: ${firstSegment}`);
        navigate(`/auth/login`);
      }
    }
  }, []);

  return (
    <div className="w-full border-b border-solid border-slate-200 px-4 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-center font-medium hover:cursor-pointer" onClick={goBack}>
          <ChevronLeft strokeWidth={1.5} className="size-5" />
          <span className="text-sm text-gray-800">Quay lại</span>
        </div>

        <div className="flex items-center gap-5">
          <img
            alt="flag/vi.svg"
            src="https://239114911.e.cdneverest.net/cdnazota/storage_public/azota_assets/flag/vi.svg"
          ></img>
          <LuBell className="size-5 text-slate-600" />

          {accessToken ? <Menu /> : <AnonymousMenu />}
        </div>
      </div>
    </div>
  );
};

export default TopBar;
