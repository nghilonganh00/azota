const DelegationBox = () => {
  return (
    <div className="col-span-4 bg-slate-100 p-3 rounded-md">
      <h3 className="font-semibold text-gray-800">Lớp 2</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <input type="checkbox" id="role_1_1" />
          <label className="text-sm" htmlFor="role_1_1">
            Giao bài tập, giao đề thi
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="role_1_2" />
          <label className="text-sm" htmlFor="role_1_2">
            Chấm bài
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="role_1_3" />
          <label className="text-sm" htmlFor="role_1_3">
            Quản lý danh sách học sinh
          </label>
        </div>
      </div>
    </div>
  );
};

export default DelegationBox;