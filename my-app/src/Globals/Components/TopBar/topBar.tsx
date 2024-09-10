import { LuBell } from "react-icons/lu";
import { Link, useSearchParams } from "react-router-dom";
import Menu from "../Menu/menu";
import { ChevronLeft } from "lucide-react";

const TopBar = () => {
  const [searchParams] = useSearchParams();

  const backTo = searchParams.get("backto") || "/";

  console.log("backTo:", backTo);

  return (
    <div className="w-full border-b border-solid border-slate-200 py-4 px-4">
      <div className="flex items-center justify-between">
        <Link
          to={backTo}
          className="flex items-center gap-1  text-center font-medium"
        >
          <ChevronLeft strokeWidth={1.5} className="size-5" />
          <span className="text-sm text-gray-800">Quay lại</span>
        </Link>

        <div className="flex items-center gap-5">
          <img
            alt="flag/vi.svg"
            src="https://239114911.e.cdneverest.net/cdnazota/storage_public/azota_assets/flag/vi.svg"
          ></img>
          <LuBell className="size-5 text-slate-600" />

          <Menu />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
