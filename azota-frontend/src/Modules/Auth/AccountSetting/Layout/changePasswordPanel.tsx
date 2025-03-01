export const ChangePasswordPanel = () => {
  const handleUpdate = () => {};
  return (
    <form onSubmit={handleUpdate}>
      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-6">
          <label htmlFor="current-password" className="mb-1.5 inline-block">
            Mật khẩu hiện tại
          </label>
          <input
            type="text"
            id="current-password"
            className="w-full rounded-md border px-2 py-2 text-sm dark:border-none dark:bg-darkmode-800"
            placeholder="Nhập mật khẩu..."
            required
          />
        </div>

        <div className="col-span-6">
          <label htmlFor="new-password" className="mb-1.5 inline-block">
            Mật khẩu mới
          </label>
          <input
            type="text"
            id="new-password"
            className="w-full rounded-md border px-2 py-2 text-sm dark:border-none dark:bg-darkmode-800"
            placeholder="Nhập mật khẩu..."
            required
          />
        </div>
      </div>
      <div className="mt-3 text-xs text-slate-400">Bạn cần nhập mật khẩu hiện tại để có thể đổi mật khẩu mới</div>
      <div className="mt-3 text-xs text-red-600">Vui lòng nhập mật khẩu.</div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-blue-700">Quên mật khẩu?</div>

        <button type="submit" className="float-right rounded bg-blue-800 px-8 py-2.5">
          Cập nhật
        </button>
      </div>
    </form>
  );
};
