import { SquareDivide } from "lucide-react";
import { useState } from "react";

interface SetPointsButtonProps {
  examJSON: any;
  setExamJSON: React.Dispatch<React.SetStateAction<any>>;
}

const SetPointsButton: React.FC<SetPointsButtonProps> = (props) => {
  const { examJSON, setExamJSON } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [totalScore, setTotalScore] = useState<number>(0);

  const handleDivide = () => {
    if (totalScore <= 0) {
      return;
    }

    if (!examJSON || typeof examJSON !== "object") return;

    // Count total number of questions
    let questionCount = 0;
    Object.values(examJSON).forEach((part: any) => {
      if (part && part.questions) {
        questionCount += Object.keys(part.questions).length;
      }
    });

    if (questionCount === 0) return;

    const scorePerQuestion = totalScore / questionCount;

    // Create a new examJSON with updated points
    const newExamJSON = Object.fromEntries(
      Object.entries(examJSON).map(([partKey, part]: [string, any]) => {
        if (!part || !part.questions) return [partKey, part];
        const newQuestions = Object.fromEntries(
          Object.entries(part.questions).map(([qKey, q]: [string, any]) => [
            qKey,
            { ...q, scorePerQuestion: scorePerQuestion },
          ]),
        );
        return [partKey, { ...part, questions: newQuestions }];
      }),
    );

    setExamJSON(newExamJSON);

    setIsOpen(false);
  };

  return (
    <div>
      <button
        type="button"
        className="flex items-center justify-center gap-1.5 rounded-md border-x border-slate-300 bg-blue-800 px-3 py-1.5 shadow-sm hover:cursor-pointer hover:bg-blue-700 dark:border-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <SquareDivide strokeWidth={1.6} className="size-4 text-white" />
        <div className="text-xs font-medium text-white">Chia điểm</div>
      </button>

      {isOpen && (
        <div
          className="fixed right-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-5/6 max-w-[600px] rounded-md border-x border-slate-300 bg-blue-800 px-3 py-1.5 shadow-sm dark:border-none dark:bg-darkmode-600"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-3 text-base font-semibold">Quick score distribution</div>
            <div className="py-3">
              <div className="flex items-center justify-between gap-2">
                <div className="text-sm">Total test scores (2 Questions)</div>
                <input
                  type="number"
                  placeholder=""
                  className="w-24 appearance-none rounded-md border border-none border-gray-300 px-3 py-2 text-center text-sm dark:bg-darkmode-800 dark:text-slate-300"
                  defaultValue={totalScore}
                  onChange={(e) => setTotalScore(Number(e.target.value))}
                />
              </div>
              {totalScore <= 0 && <h5 className="text-xs text-red-500">Please enter score greater than 0</h5>}
            </div>
            <div className="float-right flex items-center justify-center gap-3 py-3">
              <div
                className="rounded border px-8 py-2 hover:cursor-pointer hover:bg-darkmode-400 dark:border-slate-600"
                onClick={() => setIsOpen(false)}
              >
                Close
              </div>
              <div
                className="rounded bg-blue-700 px-8 py-2 hover:cursor-pointer hover:bg-blue-600"
                onClick={handleDivide}
              >
                <div className="text-white">Divide</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SetPointsButton;
