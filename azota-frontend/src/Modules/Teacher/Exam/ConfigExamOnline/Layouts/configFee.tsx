import { Exam } from "../../../../../Globals/Interfaces/exam.interface";

interface ConfigFeeProps {
  examConfig: Exam;
  setExamConfig: React.Dispatch<React.SetStateAction<Exam>>;
  handleChangeConfig: (name: string, newValue: string) => void;
}

const ConfigFee: React.FC<ConfigFeeProps> = (props) => {
  const { examConfig, setExamConfig, handleChangeConfig } = props;
  const { fee } = examConfig;

  return (
    <div className="rounded-md bg-white px-5 py-6 text-gray-800 shadow dark:bg-darkmode-600 dark:text-slate-300">
      <div className="grid grid-cols-12">
        <div className="col-span-12 xl:col-span-5">
          <div className="text-sm font-medium">Cấu hình giá</div>
          <div className="mt-1 text-xs/6 text-slate-500">
            Chức năng này giúp giáo viên, người tạo đề có thể đặt giá thu phí người tham gia thi, Azota đóng vai trò
            trung gian cung cấp nền tảng và thu hộ, hàng tháng Azota sẽ đối soát và chuyển khoản về tài khoản ngân hàng
            của giáo viên/người tạo đề.
          </div>
          <div className="text-xs text-red-600">Lưu ý: Chắc chắn rằng bạn đã đủ 18 tuổi để sử dụng chức năng này</div>
          <div className="text-xs font-medium text-blue-900">Tìm hiểu thêm</div>
        </div>

        <div className="col-span-12 mt-4 xl:col-span-7">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="config-fee-free"
                name="fee-config"
                className="h-4 w-4 border-gray-300 accent-blue-600"
                defaultChecked={fee === "FREE"}
                onChange={() => handleChangeConfig("fee", "FREE")}
              />
              <label className="text-sm" htmlFor="config-fee-free">
                Miễn phí
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="config-fee-pratice"
                name="fee-config"
                className="h-4 w-4 border-gray-300 accent-blue-600"
                defaultChecked={fee === "TEST"}
                onChange={() => handleChangeConfig("fee", "TEST")}
              />
              <label className="text-sm" htmlFor="config-fee-pratice">
                Thu phí khi tham gia
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="radio"
                id="config-fee-explain"
                name="fee-config"
                className="h-4 w-4 border-gray-300 accent-blue-600"
                defaultChecked={fee === "EXPLAIN"}
                onChange={() => handleChangeConfig("fee", "EXPLAIN")}
              />
              <label className="text-sm" htmlFor="config-fee-explain">
                Thu phí khi xem giải thích
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigFee;
