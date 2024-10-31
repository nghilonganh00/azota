import {
  ChevronLeft,
  FilePenLine,
  Hand,
  Maximize,
  Timer,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useEffect } from "react";
import { useCountDown } from "../../TakeTraining/libs/hooks";
import { Exam } from "../../TakeTraining/libs/interface";
import useGoBack from "../../../../../hooks/useGoBack";

interface TakeExamHeaderProps {
  exam: Exam;
  handleFinish: () => void;
}

const TakeExamHeader: React.FC<TakeExamHeaderProps> = (props) => {
  const { exam, handleFinish } = props;

  const goBack = useGoBack();
  let timeLeft = useCountDown(exam.examDuration * 60);

  console.log("exam: ", exam);

  useEffect(() => {
    if (
      timeLeft.hours === "00" &&
      timeLeft.minutes === "00" &&
      timeLeft.seconds === "00" &&
      exam.examDuration !== 0
    ) {
      handleFinish();
    }
  }, [timeLeft]);

  return (
    <div className="fixed left-0 top-0 flex w-screen items-center bg-white px-3 py-2">
      <div className="mx-auto text-sm font-medium">Thí sinh: Lê Văn Thiện</div>

      {exam.examDuration !== 0 && (
        <div className="mr-2 flex items-center gap-2">
          <Timer strokeWidth={1.5} className="w-[20px]" />
          <div className="text-sm font-medium">{`${timeLeft.hours} : ${timeLeft.minutes} : ${timeLeft.seconds}`}</div>
        </div>
      )}

      <div className="flex gap-3">
        <div className="flex items-center gap-2">
          <div className="flex size-9 items-center justify-center rounded-md bg-gray-100">
            <ZoomOut strokeWidth={1.6} className="w-[18px] text-slate-400" />
          </div>

          <div className="flex size-9 items-center justify-center rounded-md bg-slate-200/60">
            <ZoomIn strokeWidth={1.6} className="w-[18px] text-slate-500" />
          </div>
        </div>

        <div className="flex size-9 items-center justify-center rounded-md bg-slate-200/60">
          <Maximize strokeWidth={1.6} className="w-[18px] text-slate-500" />
        </div>

        <div
          onClick={handleFinish}
          className="flex items-center justify-center gap-2 rounded-md bg-blue-800 px-2 py-1 hover:cursor-pointer"
        >
          <FilePenLine className="size-4 text-white" strokeWidth={1.5} />
          <div className="text-xs font-medium text-white">Nộp bài</div>
        </div>
      </div>
    </div>
  );
};

export default TakeExamHeader;
