import { useState } from "react";
import Toggle from "../../../../../Globals/Components/Toggle/toggle";
import { Exam } from "../../../../../Globals/Interfaces/exam.interface";

interface ConfigSecurityProps {
  examConfig: Exam;
  setExamConfig: React.Dispatch<React.SetStateAction<Exam>>;
  handleChangeConfig: (name: string, newValue: string) => void;
}

const ConfigSecurity: React.FC<ConfigSecurityProps> = (props) => {
  const { examConfig, setExamConfig, handleChangeConfig } = props;
  const [isVerifyStudent, setVerityStudent] = useState(false);

  return (
    <div className="rounded-md bg-white px-5 py-6 text-gray-800 shadow dark:bg-darkmode-600 dark:text-slate-300">
      <div className="mb-6 border-b border-gray-200 pb-4 text-base font-medium dark:border-darkmode-400">Bảo mật</div>

      <div className="space-y-4">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-5">
            <div className="text-sm font-medium">Số lượt làm đề</div>
          </div>

          <div className="col-span-5">
            <input
              type="text"
              // placeholder="Nhập tên ..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-none dark:bg-darkmode-800"
              // value={examName}
              // onChange={(e) => setExamName(e.target.value)}
            />
            <div className="col-span-12 mt-1 text-xs text-slate-500 dark:text-slate-400">
              *Nhập 0 hoặc để trống để không giới hạn số lượt làm đề thi
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-5">
            <div className="text-sm font-medium">Mật khẩu đề thi</div>
          </div>

          <div className="col-span-5">
            <input
              type="text"
              placeholder="Nhập mật khẩu ..."
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-none dark:bg-darkmode-800"
              // value={examName}
              // onChange={(e) => setExamName(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-5">
            <div className="text-sm font-medium">Giám sát tự động</div>
          </div>

          <div className="col-span-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="config-who-all"
                  name="who-allow"
                  value={"ALL"}
                  onChange={(e) => handleChangeConfig("examTypeAssign", e.target.value)}
                  // defaultChecked={examAssignType === "ALL"}
                />
                <label className="text-sm" htmlFor="config-who-all">
                  Tất cả mọi người
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="config-who-class"
                  name="who-allow"
                  value={"CLASS"}
                  onChange={(e) => handleChangeConfig("examTypeAssign", e.target.value)}
                  // defaultChecked={examAssignType === "CLASS"}
                />
                <label className="text-sm" htmlFor="config-who-class">
                  Giao theo lớp
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="config-who-student"
                  name="who-allow"
                  value={"STUDENT"}
                  onChange={(e) => handleChangeConfig("examTypeAssign", e.target.value)}
                  // defaultChecked={examAssignType === "STUDENT"}
                />
                <label className="text-sm" htmlFor="config-who-student">
                  Giao theo học sinh
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12">
          <div className="col-span-5">
            <div className="font-medium">Xác thực thông tin học sinh</div>
            <div className="mt-2 pr-2 text-xs/5 text-slate-500">
              Khi học sinh vào làm bài sẽ phải khai báo thêm các thông tin mà bạn yêu cầu.
            </div>
          </div>
          <div className="col-span-2">
            <Toggle isOpen={isVerifyStudent} setOpen={setVerityStudent} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigSecurity;
