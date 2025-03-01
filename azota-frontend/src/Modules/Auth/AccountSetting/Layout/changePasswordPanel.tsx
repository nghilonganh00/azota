import { useState } from "react";
import UserAPI from "../../../../API/userAPI";
import { useForm } from "../../../../Globals/Hooks/useForm";
import { Eye, EyeOff } from "lucide-react";
import AuthAPI from "../../../../API/authAPI";

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

export const ChangePasswordPanel = () => {
  const { formData, setFormData, handleChange, resetForm } = useForm<ChangePasswordData>({
    currentPassword: "",
    newPassword: "",
  });
  const [isShowCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [isShowNewPassword, setShowNewPassword] = useState<boolean>(false);

  const handleUpdate = async () => {
    const { currentPassword, newPassword } = formData;
    const response = await UserAPI.changePassword(currentPassword, newPassword);
    if (response?.status === 204) {
      const logoutResponse = await AuthAPI.logout();
      localStorage.removeItem("accessToken");
    }
  };
  return (
    <form>
      <div className="grid grid-cols-12 gap-5">
        <div className="relative col-span-6">
          <label htmlFor="current-password" className="mb-1.5 inline-block">
            Mật khẩu hiện tại
          </label>
          <input
            type={isShowCurrentPassword ? "text" : "password"}
            id="current-password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="w-full rounded-md border px-2 py-2 text-sm dark:border-none dark:bg-darkmode-800"
            placeholder="Nhập mật khẩu..."
            required
          />
          {isShowCurrentPassword ? (
            <Eye
              className="absolute right-2 top-8 hover:cursor-pointer"
              strokeWidth={1.6}
              onClick={() => setShowCurrentPassword(false)}
            />
          ) : (
            <EyeOff
              className="absolute right-2 top-8 hover:cursor-pointer"
              strokeWidth={1.6}
              onClick={() => setShowCurrentPassword(true)}
            />
          )}
        </div>

        <div className="relative col-span-6">
          <label htmlFor="new-password" className="mb-1.5 inline-block">
            Mật khẩu mới
          </label>
          <input
            type={isShowNewPassword ? "text" : "password"}
            id="new-password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full rounded-md border px-2 py-2 text-sm dark:border-none dark:bg-darkmode-800"
            placeholder="Nhập mật khẩu..."
            required
          />
          <div className="absolute right-2 top-8 hover:cursor-pointer">
            {isShowNewPassword ? (
              <Eye strokeWidth={1.6} onClick={() => setShowNewPassword(false)} />
            ) : (
              <EyeOff strokeWidth={1.6} onClick={() => setShowNewPassword(true)} />
            )}
          </div>
        </div>
      </div>
      <div className="mt-3 text-xs text-slate-400">Bạn cần nhập mật khẩu hiện tại để có thể đổi mật khẩu mới</div>
      {!formData.currentPassword && <div className="mt-3 text-xs text-red-600">Vui lòng nhập mật khẩu.</div>}

      <div className="mt-4 flex items-center justify-between">
        <div className="text-blue-700">Quên mật khẩu?</div>

        <button type="button" onClick={handleUpdate} className="float-right rounded bg-blue-800 px-8 py-2.5">
          Cập nhật
        </button>
      </div>
    </form>
  );
};
