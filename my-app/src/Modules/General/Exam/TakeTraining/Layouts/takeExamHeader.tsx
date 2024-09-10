import {
  ChevronLeft,
  Hand,
  Maximize,
  Timer,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Exam } from "../../../../Teacher/Exam/UpdateExam/libs/interface";
import { useCountDown } from "../libs/hooks";
import { useEffect } from "react";

interface TakeExamHeaderProps {
  exam: Exam;
  handleFinish: () => void;
}

const TakeExamHeader: React.FC<TakeExamHeaderProps> = (props) => {
  const { exam, handleFinish } = props;

  const timeLeft = useCountDown(60);

  useEffect(() => {
    if (
      timeLeft.hours === "00" &&
      timeLeft.minutes === "00" &&
      timeLeft.seconds === "00"
    ) {
      handleFinish();
    }
  }, [timeLeft]);

  return (
    <div className="fixed left-0 top-0 flex w-screen items-center bg-white px-3 py-2">
      <div className="flex items-center justify-center gap-1 rounded-md border border-gray-200 px-2.5 py-1.5 text-center shadow-sm">
        <ChevronLeft strokeWidth={1.5} className="size-5 text-gray-500" />
        <span className="text-xs font-medium text-gray-500">Quay lại</span>
      </div>

      <div className="mx-auto text-sm font-medium">Thí sinh: Lê Văn Thiện</div>

      <div className="flex items-center gap-2">
        <Timer strokeWidth={1.5} className="w-[20px]" />
        <div className="text-sm font-medium">{`${timeLeft.hours} : ${timeLeft.minutes} : ${timeLeft.seconds}`}</div>
      </div>

      <div className="ml-4 flex items-center gap-2">
        <div className="flex size-9 items-center justify-center rounded-md bg-gray-100">
          <ZoomOut strokeWidth={1.6} className="w-[18px] text-slate-400" />
        </div>

        <div className="flex size-9 items-center justify-center rounded-md bg-slate-200/60">
          <ZoomIn strokeWidth={1.6} className="w-[18px] text-slate-500" />
        </div>
      </div>

      <div className="ml-3 flex size-9 items-center justify-center rounded-md bg-slate-200/60">
        <Maximize strokeWidth={1.6} className="w-[18px] text-slate-500" />
      </div>
    </div>
  );
};

export default TakeExamHeader;
