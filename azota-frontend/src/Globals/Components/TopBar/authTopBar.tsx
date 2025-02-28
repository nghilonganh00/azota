import { Moon } from "lucide-react";

const AuthTopBar = () => {
  return (
    <div className="w-full border-b border-solid border-slate-200 px-8 py-4 dark:border-darkmode-400 ">
      <div className="flex items-center justify-between">
        <img
          width="95px"
          src="https://239114911.e.cdneverest.net/cdnazota/storage_public/azota_assets/images/logo.svg"
        ></img>

        <div className="flex items-center gap-6">
          <img
            alt="flag/vi.svg"
            src="https://239114911.e.cdneverest.net/cdnazota/storage_public/azota_assets/flag/vi.svg"
          ></img>

          <div className="flex items-center gap-2">
            <Moon className="size-5 text-gray-500" strokeWidth={1.5} />
            <div className="text-sm font-semibold text-gray-500">Chế độ tối</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthTopBar;
