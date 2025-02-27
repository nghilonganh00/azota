import { useState } from "react";
import { Exam } from "../../../../../Globals/Interfaces/exam.interface";
import { ExamType } from "../../../../../Globals/Constant/constant";

interface ConfigTypeProp {
  examConfig: Exam;
  setExamConfig: React.Dispatch<React.SetStateAction<Exam>>;
  handleChangeConfig: (name: string, newValue: string) => void;
}

const ConfigType: React.FC<ConfigTypeProp> = (props) => {
  const { examConfig, setExamConfig, handleChangeConfig } = props;

  const [examType, setExamType] = useState<ExamType>(examConfig.type);

  const toggleSwitch = (newExamType: ExamType) => {
    setExamType(newExamType);
    handleChangeConfig("examType", newExamType);
  };

  return (
    <div className="rounded-md bg-white px-5 py-6 text-gray-800 shadow dark:bg-darkmode-600 dark:text-slate-300">
      <div className="relative flex flex-col items-center justify-center">
        <div className="absolute left-0 top-2 font-medium">Loại cấu hình</div>

        <div className="relative top-0 inline-flex items-center rounded-full border border-gray-400 hover:cursor-pointer dark:border-none dark:bg-darkmode-800">
          <button
            type="button"
            onClick={() => toggleSwitch(ExamType.TEST)}
            className={`z-10 w-24 px-3 py-2 text-center font-medium transition duration-200 ${examType === "TEST" ? "text-white" : "text-gray-800 dark:text-slate-300"}`}
          >
            Kiểm tra
          </button>
          <button
            type="button"
            onClick={() => toggleSwitch(ExamType.PRACTICE)}
            className={`z-10 w-24 px-3 py-2 text-center font-medium transition duration-200 ${examType === "TEST" ? "text-gray-800 dark:text-slate-300" : "text-white"}`}
          >
            Luyện tập
          </button>
          <span
            className={`absolute left-0 top-0 h-9 w-[96px] rounded-full transition-transform duration-200 ease-linear ${examType === "TEST" ? "translate-x-0 transform bg-blue-800" : "translate-x-full transform bg-blue-800"}`}
          ></span>
        </div>

        <div className="w-full">
          {examType === ExamType.TEST ? (
            <div className="mt-2 text-sm/6 text-slate-500">
              Cấu hình này thường dùng cho các kỳ thi nghiêm túc, cần bảo mật đáp án và đề thi cho tới khi kết thúc kỳ
              thi
            </div>
          ) : (
            <div className="mt-2 text-sm/6 text-slate-500">
              Cấu hình này thường dùng cho học sinh luyện tập. Câu hỏi được hiển thị từng câu một giống các game 'Ai là
              triệu phú', khi trả lời tới câu hỏi nào thì học sinh sẽ nhận được đáp án đúng và lời giải của câu hỏi đó
              luôn. <span className="text-[#f97316]">Lưu ý: Hiện chưa hỗ trợ luyện tập với câu tự luận.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfigType;
