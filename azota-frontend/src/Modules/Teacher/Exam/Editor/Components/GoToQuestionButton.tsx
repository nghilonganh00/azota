import { ArrowDownUp } from "lucide-react";
import { useState } from "react";

interface GoToQuestionButtonProps {
  goToQuestion: number;
  setGoToQuestion: React.Dispatch<React.SetStateAction<number>>;
  handleGoToQuestion: () => void;
}

const GoToQuestionButton: React.FC<GoToQuestionButtonProps> = (props) => {
  const { goToQuestion, setGoToQuestion, handleGoToQuestion } = props;
  const [goToQuestionInput, setGoToQuestionInput] = useState<number>(goToQuestion);

  return (
    <div className="flex items-center justify-center gap-2">
      <ArrowDownUp strokeWidth={1.6} className="size-5 text-gray-900 dark:text-slate-300" />

      <div className="text-[13px] text-gray-900 dark:text-slate-300">Đi đến đâu</div>

      <input
        type="number"
        placeholder=""
        className="h-7 w-[60px] rounded border border-gray-300 px-3 py-2 text-sm dark:text-slate-800"
        defaultValue={goToQuestionInput}
        onChange={(e) => setGoToQuestionInput(Number(e.target.value))}
      />

      <div
        className="flex items-center justify-center gap-1 rounded-md bg-blue-800 px-3 py-1.5 shadow-sm hover:cursor-pointer hover:bg-blue-700"
        onClick={handleGoToQuestion}
      >
        <div className="text-xs font-semibold text-white">Đến</div>
      </div>
    </div>
  );
};

export default GoToQuestionButton;
