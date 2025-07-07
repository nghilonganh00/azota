import { CircleAlert, History, Info } from "lucide-react";
import { Exam } from "../../../../../Globals/Interfaces/exam.interface";
import AssignTabs from "../Components/assignTabs";
import { CategoryForm } from "../Components/categoryForm";

interface ConfigGeneralProp {
  examConfig: Exam;
  assignedclassrooms: number[];
  setAssignedclassrooms: React.Dispatch<React.SetStateAction<number[]>>;
  assignedStudentIds: number[];
  setAssignedStudentIds: React.Dispatch<React.SetStateAction<number[]>>;
  handleChangeConfig: (name: string, newValue: any) => void;
}

const ConfigGeneral: React.FC<ConfigGeneralProp> = (props) => {
  const {
    examConfig,
    assignedclassrooms,
    setAssignedclassrooms,
    assignedStudentIds,
    setAssignedStudentIds,
    handleChangeConfig,
  } = props;

  const { type, title, gradeId, subjectId, purposeId, duration } = examConfig;

  console.log("end date: ", examConfig.endDate);

  return (
    <div className="rounded-md bg-white px-5 py-6 text-gray-800 shadow dark:bg-darkmode-600 dark:text-slate-300">
      <form action="">
        <div className="border-b border-gray-200 pb-4 text-base font-medium dark:border-darkmode-400">
          Cấu hình chung
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <div className="mb-2 font-medium">Tên đề thi</div>
            <input
              type="text"
              placeholder="Nhập tên đề thi ..."
              value={title}
              onChange={(e) => handleChangeConfig("title", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm dark:border-none dark:bg-darkmode-800"
            />
          </div>

          <CategoryForm
            gradeId={gradeId}
            subjectId={subjectId}
            purposeId={purposeId}
            handleChangeConfig={handleChangeConfig}
          />

          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <label htmlFor="exam-duration" className="mb-2 flex items-center gap-1 text-sm font-medium">
                Thời gian làm bài (phút)
                <span className="c-lucide">
                  <CircleAlert strokeWidth={1.5} className="size-4 text-gray-900 dark:text-slate-300" />
                </span>
              </label>
            </div>
            <div className="col-span-12">
              <input
                type="text"
                id="exam-duration"
                value={duration}
                onChange={(e) => handleChangeConfig("duration", e.target.value)}
                placeholder="Nhập thời gian ..."
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm dark:border-none dark:bg-darkmode-800"
              />
            </div>
            <div className="col-span-12 mt-1 text-xs text-slate-500">Nhập 0 để không giới hạn thời gian</div>
          </div>

          {type === "TEST" && (
            <div className="grid grid-cols-12 gap-x-3">
              <div className="col-span-12">
                <label htmlFor="" className="mb-2 flex items-center gap-2 text-sm font-medium">
                  Thời gian giao đề
                  <Info className="size-4 text-gray-800" strokeWidth={1.5} />
                </label>
              </div>

              <div className="relative col-span-5">
                <input
                  type="datetime-local"
                  value={examConfig.startDate?.slice(0, 16)}
                  onChange={(e) => handleChangeConfig("startDate", e.target.value)}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-medium shadow-sm dark:border-none dark:bg-darkmode-800"
                />
              </div>

              <div className="relative col-span-5">
                <input
                  type="datetime-local"
                  value={examConfig.endDate?.slice(0, 16)}
                  onChange={(e) => handleChangeConfig("endDate", e.target.value)}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-medium shadow-sm dark:border-none dark:bg-darkmode-800"
                />
              </div>

              <div className="col-span-2">
                <div className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 px-1 py-2 shadow-sm hover:cursor-pointer hover:bg-gray-100 dark:border-darkmode-400">
                  <History className="size-4 text-gray-500" strokeWidth={1.5} />
                  <div className="text-sm font-semibold text-gray-500 dark:text-slate-300">Đặt lại</div>
                </div>
              </div>

              <div className="col-span-12 mt-1 text-xs text-slate-500 dark:text-slate-400">
                Chỉ được phép gia hạn thêm 'Thời gian giao đề' hoặc 'Thời gian làm bài'. Việc sửa cấu hình lùi thời gian
                khi học sinh đã thi có thể làm mất dữ liệu bài làm của học sinh.
              </div>

              <div className="col-span-12 mt-1 text-xs text-slate-500 dark:text-slate-400">
                Bỏ trống nếu không muốn giới hạn thời gian.
              </div>
            </div>
          )}

          <AssignTabs
            examConfig={examConfig}
            assignedclassrooms={assignedclassrooms}
            setAssignedclassrooms={setAssignedclassrooms}
            assignedStudentIds={assignedStudentIds}
            setAssignedStudentIds={setAssignedStudentIds}
            handleChangeConfig={handleChangeConfig}
          />
        </div>
      </form>
    </div>
  );
};

export default ConfigGeneral;
