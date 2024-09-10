import { useState, useEffect } from "react";
import {
  GRADE_OPTIONS,
  PURPOSE_OPTIONS,
  SUBJECT_OPTIONS,
} from "../../CreateExam/libs/constant";
import Dropdown from "../../../../../Globals/Components/Dropdown/dropdown";
import { CircleAlert, History, Info } from "lucide-react";
import {
  ExamByClass,
  ExamConfig,
} from "../../../../../Globals/Interfaces/interface";
import AssignTabs from "../Components/assignTabs";

interface ConfigGeneralProp {
  examConfig: ExamConfig;
  setExamConfig: React.Dispatch<React.SetStateAction<ExamConfig>>;
  assignedClasses: number[];
  setAssignedClasses: React.Dispatch<React.SetStateAction<number[]>>;
  handleChangeConfig: (name: string, newValue: string | number[]) => void;
}

const ConfigGeneral: React.FC<ConfigGeneralProp> = (props) => {
  const {
    examConfig,
    setExamConfig,
    assignedClasses,
    setAssignedClasses,
    handleChangeConfig,
  } = props;

  const {
    examType,
    examName,
    gradeId,
    subjectId,
    purposeId,
    examDuration,
    examAssignType,
  } = examConfig;

  const [selectedGrade, setSelectedGrade] = useState(GRADE_OPTIONS[gradeId]);
  const [selectedSubject, setSelectedSubject] = useState(
    SUBJECT_OPTIONS[subjectId],
  );
  const [selectedPurpose, setSelectedPurpose] = useState(
    PURPOSE_OPTIONS[purposeId],
  );

  useEffect(() => {
    setExamConfig((preValue) => ({
      ...preValue,
      gradeId: parseInt(selectedGrade?.value),
      subjectId: parseInt(selectedSubject?.value),
      purposeId: parseInt(selectedSubject?.value),
    }));
  }, [selectedGrade, selectedSubject, selectedPurpose]);

  console.log("exam: ", examConfig);

  return (
    <div className="rounded-md bg-white px-5 py-6 text-gray-800 shadow">
      <form action="">
        <div className="border-b border-gray-200 pb-4 text-base font-medium">
          Cấu hình chung
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <div className="mb-2 font-medium">Tên đề thi</div>
            <input
              type="text"
              placeholder="Nhập tên đề thi ..."
              value={examName}
              onChange={(e) => handleChangeConfig("examName", e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-6">
              <span className="mb-2 flex text-sm font-medium">Khối học</span>

              <Dropdown
                options={SUBJECT_OPTIONS}
                selectedValue={selectedSubject}
                setSelectedValue={setSelectedPurpose}
              />
            </div>

            <div className="col-span-6">
              <span className="mb-2 flex text-sm font-medium">Môn học</span>

              <Dropdown
                options={GRADE_OPTIONS}
                selectedValue={selectedGrade}
                setSelectedValue={setSelectedGrade}
              />
            </div>
          </div>

          <div className="col-span-6">
            <span className="mb-2 text-sm font-medium">Mục đích tạo đề</span>

            <Dropdown
              options={GRADE_OPTIONS}
              selectedValue={selectedGrade}
              setSelectedValue={setSelectedGrade}
            />
          </div>

          <div className="grid grid-cols-12">
            <div className="col-span-12">
              <label
                htmlFor="new-hw-name"
                className="mb-2 flex items-center gap-1 text-sm font-medium"
              >
                Thời gian làm bài (phút)
                <span className="c-lucide">
                  <CircleAlert
                    strokeWidth={1.5}
                    className="size-4 text-gray-900"
                  />
                </span>
              </label>
            </div>
            <div className="col-span-12">
              <input
                type="text"
                id="exam-duration"
                value={examDuration}
                onChange={(e) =>
                  handleChangeConfig("examDuration", e.target.value)
                }
                placeholder="Nhập thời gian ..."
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm"
              />
            </div>
            <div className="col-span-12 mt-1 text-xs text-slate-500">
              Nhập 0 để không giới hạn thời gian
            </div>
          </div>

          {examType === "TEST" && (
            <div className="grid grid-cols-12 gap-x-3">
              <div className="col-span-12">
                <label
                  htmlFor=""
                  className="mb-2 flex items-center gap-2 text-sm font-medium"
                >
                  Thời gian giao đề
                  <Info className="size-4 text-gray-800" strokeWidth={1.5} />
                </label>
              </div>

              <div className="relative col-span-5">
                <input
                  type="datetime-local"
                  // value={values["homeworkStartDate"]}
                  // onChange={(e) => onChange("homeworkStartDate", e.target.value)}
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-medium shadow-sm"
                />
              </div>

              <div className="relative col-span-5">
                <input
                  type="datetime-local"
                  className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-medium shadow-sm"
                />
              </div>

              <div className="col-span-2">
                <div className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 px-1 py-2 shadow-sm hover:cursor-pointer hover:bg-gray-100">
                  <History className="size-4 text-gray-500" strokeWidth={1.5} />
                  <div className="text-sm font-semibold text-gray-500">
                    Đặt lại
                  </div>
                </div>
              </div>

              <div className="col-span-12 mt-1 text-xs text-slate-500">
                Chỉ được phép gia hạn thêm 'Thời gian giao đề' hoặc 'Thời gian
                làm bài'. Việc sửa cấu hình lùi thời gian khi học sinh đã thi có
                thể làm mất dữ liệu bài làm của học sinh.
              </div>

              <div className="col-span-12 mt-1 text-xs text-slate-500">
                Bỏ trống nếu không muốn giới hạn thời gian.
              </div>
            </div>
          )}

          <AssignTabs
            examConfig={examConfig}
            setExamConfig={setExamConfig}
            assignedClasses={assignedClasses}
            setAssignedClasses={setAssignedClasses}
            handleChangeConfig={handleChangeConfig}
          />
        </div>
      </form>
    </div>
  );
};

export default ConfigGeneral;
