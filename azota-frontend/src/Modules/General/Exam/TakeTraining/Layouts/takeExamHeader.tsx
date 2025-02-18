import { Maximize, Timer, ZoomIn, ZoomOut } from "lucide-react";
import { useCountDown } from "../libs/hooks";
import { useEffect } from "react";
import { Exam } from "../libs/interface";

interface TakeExamHeaderProps {
  exam: Exam;
  handleFinish: () => void;
}

const TakeExamHeader: React.FC<TakeExamHeaderProps> = (props) => {
  const { exam, handleFinish } = props;

  const timeLeft = useCountDown(exam.examDuration);

  useEffect(() => {
    if (timeLeft.hours === "00" && timeLeft.minutes === "00" && timeLeft.seconds === "00") {
      // handleFinish();
      console.log("Time out");
    }
  }, [timeLeft]);

  return (
    <div className="fixed left-0 top-0 flex w-screen items-center bg-white px-3 py-2">
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
