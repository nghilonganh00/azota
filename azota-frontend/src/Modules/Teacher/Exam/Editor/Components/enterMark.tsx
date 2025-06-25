import { useState, Fragment } from "react";

interface EnterMarkProps {
  partKey: string;
  questionKey: string;
  examJSON: any;
  setExamJSON: React.Dispatch<React.SetStateAction<any>>;
}

const EnterMark: React.FC<EnterMarkProps> = (props) => {
  const { partKey, questionKey, examJSON, setExamJSON } = props;
  const score = Math.round(examJSON[partKey]["questions"][questionKey]["scorePerQuestion"] * 100) / 100;


  const [isOpenInput, setOpenInput] = useState(false);

  const handleEnterMark = (scorePerQuestion: string) => {
    const newExamJSON = {
      ...examJSON,
      [partKey]: {
        ...examJSON[partKey],
        questions: {
          ...examJSON[partKey]["questions"],
          [questionKey]: { ...examJSON[partKey]["questions"][questionKey] },
        },
      },
    };

    newExamJSON[partKey]["questions"][questionKey]["scorePerQuestion"] = scorePerQuestion;

    setExamJSON(() => newExamJSON);
  };

  console.log(isOpenInput);

  return (
    <div>
      {isOpenInput && (
        <div className="fixed left-0 top-0 z-40 h-screen w-screen" onClick={() => setOpenInput(false)}></div>
      )}

      <div className="relative z-40 border-r border-gray-400 pr-3">
        {!isOpenInput ? (
          <div className="text-sm text-blue-700" onClick={() => setOpenInput(true)}>
            {score > 0 ? score + " Điểm" : "Nhập điểm"}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <input
              type="text"
              className="h-6 w-[46px] rounded-md border border-blue-600 px-3 py-2 text-center text-sm dark:text-slate-800"
              value={score}
              onChange={(e) => handleEnterMark(e.target.value)}
            />
            <div className="text-sm text-blue-700">Điểm</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnterMark;
