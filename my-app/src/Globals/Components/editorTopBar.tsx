import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "./Menu/menu";
import { LuBell } from "react-icons/lu";

const EditorTopBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [examName, setExamName] = useState<string>("");
  const [openExamNameInput, setOpenExamNameInput] = useState<boolean>(true);

  const handleClickContinue = () => {
    localStorage.setItem("exam_config", examName);
    navigate("/teacher/exam/editor/create");
  };

  const path = location.pathname;
  useEffect(() => {
    setOpenExamNameInput(() => path === "/teacher/exam/editor");
  }, [path]);

  return (
    <div className="w-full border-b border-solid border-slate-200 bg-white px-3 py-4">
      <div className="grid grid-cols-12">
        <div className="col-span-2">
          <div className="flex">
            <div>
              <img
                width="95px"
                src="https://239114911.e.cdneverest.net/cdnazota/storage_public/azota_assets/images/logo.svg"
                alt=""
              />
            </div>
          </div>
        </div>

        <div className="col-span-6">
          {openExamNameInput && (
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Nhập tên ..."
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                />
              </div>

              <div className="rounded-md bg-gray-200 px-6 py-2.5 shadow-sm">
                <div className="text-sm font-medium text-gray-600">Hủy</div>
              </div>

              <div
                onClick={handleClickContinue}
                className="rounded-md bg-blue-800 px-3 py-2.5 shadow-sm hover:cursor-pointer hover:bg-blue-700"
              >
                <div className="text-sm font-semibold text-white">Tiếp tục</div>
              </div>
            </div>
          )}
        </div>

        <div className="col-span-4">
          <div className="flex items-center justify-end gap-5 pr-2">
            <img
              alt="flag/vi.svg"
              src="https://239114911.e.cdneverest.net/cdnazota/storage_public/azota_assets/flag/vi.svg"
            ></img>
            <LuBell className="size-5 text-slate-600" />

            <Menu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorTopBar;