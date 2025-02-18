import { OctagonAlert } from "lucide-react";
import { useState } from "react";
import { StudentClassroomAPI } from "../../../../../API/studentClassAPI";

export const CreateAnonymousLayout = () => {
  const [fullName, setFullname] = useState<string>("");

  const handleCreate = async () => {
    if (!fullName) return;

    const response = await StudentClassroomAPI.createAnonymous(fullName);

    if (response?.status !== 201) return;

    localStorage.setItem("studentClassId", response.data.id);
  };

  return (
    <div className="w-[750px] max-w-[80vw] rounded bg-white p-3 shadow-md">
      <div className="flex items-center gap-2">
        <OctagonAlert strokeWidth={1.6} className="text-orange-500" />
        <div className="font-semibold">Vui lòng nhập thêm thông tin để bắt đầu bài thi</div>
      </div>

      <div className="mb-4 mt-1 text-xs text-gray-600">
        Những thông tin này sẽ giúp giáo viên định danh và chấm điểm cho bạn
      </div>

      <form action="">
        <div className="flex h-10 rounded border border-slate-200">
          <div className="flex h-full w-32 items-center border-r border-slate-200 bg-slate-100 p-3">
            <div className="font-medium text-slate-600">Họ và tên</div>
          </div>

          <input type="text" value={fullName} onChange={(e) => setFullname(e.target.value)} className="w-full p-3" />
        </div>
      </form>

      <div className="mt-1 text-xs">Tài khoản ẩn danh cần điền họ và tên</div>

      <button
        disabled={!fullName}
        className={`float-end mt-2 rounded-md bg-blue-800 px-8 py-2.5 font-medium text-white transition-opacity ${
          fullName ? "hover:cursor-pointer hover:opacity-90" : "cursor-not-allowed opacity-40"
        }`}
        onClick={handleCreate}
      >
        Xác nhận
      </button>
    </div>
  );
};
