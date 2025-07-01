import { Plus } from "lucide-react";
import { useState } from "react";
import teacherPermissionAPI from "../../../../API/teacherPermissionAPI";
import { useNotification } from "../../../../Globals/Context/NotificationContext";

const AddTeacherButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [teacherEmail, setTeacherEmail] = useState("");
  const { addNotification } = useNotification();
  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleAddTeacher = async () => {
    if (!teacherEmail) {
      setError("Vui lòng nhập email giáo viên");
      return;
    }

    const response = await teacherPermissionAPI.registerTeacher(teacherEmail);
    if (response?.status === 201) {
      addNotification("Thêm giáo viên thành công", "SUCCESS");
      setIsOpen(false);
      setTeacherEmail("");
      setError("");
    } else {
      setError("Thêm giáo viên thất bại");
    }
  };

  return (
    <div>
      <div
        className="rounded-md bg-slate-200 p-2 hover:cursor-pointer hover:bg-slate-100 dark:bg-darkmode-400"
        onClick={handleOpen}
      >
        <Plus className="size-5 text-slate-500 dark:text-slate-300" />
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:text-slate-300"
          onClick={handleOpen}
        >
          <div
            className="w-5/12 rounded-md bg-white p-3 shadow-lg dark:bg-darkmode-600"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 text-lg font-semibold">Thêm giáo viên</div>
            <form className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="teacherName">
                  Tên giáo viên
                </label>
                <input
                  id="teacherName"
                  type="text"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-none dark:bg-darkmode-800"
                  placeholder="Nhập tên giáo viên"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium" htmlFor="teacherEmail">
                  Email
                </label>
                <input
                  id="teacherEmail"
                  type="email"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm dark:border-none dark:bg-darkmode-800"
                  placeholder="Nhập email"
                  value={teacherEmail}
                  onChange={(e) => setTeacherEmail(e.target.value)}
                />
                {error && <p className="text-sm text-red-500">{error}</p>}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="rounded-md bg-slate-200 px-8 py-2 text-sm font-semibold text-gray-600 hover:bg-slate-100 dark:bg-darkmode-400 dark:text-slate-300"
                  onClick={handleOpen}
                >
                  Hủy
                </button>
                <button
                  type="button"
                  className="rounded-md bg-blue-800 px-8 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                  disabled={teacherEmail === ""}
                  onClick={handleAddTeacher}
                >
                  Lưu
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTeacherButton;
