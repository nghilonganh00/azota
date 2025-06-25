import { Check, ChevronDown, CircleX, EllipsisVertical, Paperclip, Tag } from "lucide-react";
import EnterMark from "./enterMark";
import LevelSelector from "./LevelSelector";

interface QuestionBoxProps {
  partKey: string;
  questionKey: string;
  examJSON: any;
  setExamJSON: React.Dispatch<React.SetStateAction<any>>;
  handleGoToLine: () => void;
}

const QuestionBox: React.FC<QuestionBoxProps> = (props) => {
  const { partKey, questionKey, examJSON, setExamJSON, handleGoToLine } = props;
  const { topic, options, rightAnswer, type, level, questionIndex } = examJSON[partKey]["questions"][questionKey];

  const handleChangeRightAnswer = (optionKey: string, isCorrect: boolean) => {
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

    newExamJSON[partKey]["questions"][questionKey]["options"][optionKey]["isCorrect"] = !isCorrect;

    setExamJSON(() => newExamJSON);
  };

  const handleChangeLevel = (level: string) => {
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

    newExamJSON[partKey]["questions"][questionKey]["level"] = level;

    setExamJSON(() => newExamJSON);
  };

  return (
    <div
      className="w-full rounded-md border border-gray-400 bg-white py-6 dark:bg-darkmode-600 dark:text-slate-300"
      id={`question-${questionIndex}`}
    >
      <div className="flex items-center gap-2 px-7 text-sm">
        <div className="rounded-sm border border-gray-400 px-3 py-0.5">
          <div className="text-sm font-semibold text-blue-600">{questionKey}</div>
        </div>

        <EnterMark partKey={partKey} questionKey={questionKey} examJSON={examJSON} setExamJSON={setExamJSON} />

        <div className="flex items-center border-r border-gray-400 pr-3 text-blue-800">
          <Paperclip strokeWidth={1.5} className="size-4" />

          <div>Audio </div>
        </div>

        <div className="flex items-end border-r border-gray-400 py-0.5 pr-3 text-gray-500 dark:text-gray-800">
          <div>{type === "MULTIQLE_CHOICE" ? "Trắc nghiệm" : "Tự luận"}</div>
          <ChevronDown strokeWidth={1.5} className="size-4" />
        </div>

        <LevelSelector level={level} handleChangeLevel={handleChangeLevel} />

        <div className="hover:cursor-pointer hover:bg-gray-100">
          <EllipsisVertical className="size-4 text-gray-700 dark:text-blue-600" strokeWidth={1.5} />
        </div>
      </div>

      <div className="mt-2 space-y-1 px-7">
        <div className="rounded-sm border border-gray-300 p-1 hover:cursor-pointer" onClick={handleGoToLine}>
          <div className="text-sm">{topic}</div>
        </div>

        {Object.keys(options).map((optionKey) => {
          const option = options[optionKey];
          const { content, isCorrect } = option;

          return (
            <div
              className="relative flex items-center justify-start gap-1 hover:cursor-pointer"
              key={option.id}
              onClick={() => handleChangeRightAnswer(optionKey, isCorrect)}
            >
              {isCorrect && <Check className="-ml-4 size-3 text-blue-700" strokeWidth={5} />}

              <div
                className={
                  "rounded-sm border p-1 px-1.5 " + (isCorrect ? "border-blue-700 text-blue-700" : "border-gray-300")
                }
              >
                <div className="text-sm font-semibold">{optionKey}</div>
              </div>

              <div
                className={
                  "rounded-sm border p-1 pl-1.5 pr-5 " +
                  (isCorrect ? "border-blue-700 text-blue-700" : "border-gray-300")
                }
              >
                <div className="text-sm">{content}</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-5 border-t border-slate-300 px-7">
        <div className="-mt-2.5 text-center text-xs text-yellow-600">
          <span className="bg-white px-2">HƯỚNG DẪN GIẢI</span>
        </div>

        <div className="text-[13px]/5 text-slate-600 dark:text-slate-400">
          <div>(NB):</div>
          <div>Phương pháp: SGK Lịch sử 12, trang 76-77</div>
          <div>
            Cách giải: Trong cuộc khai thác thuộc địa lần thứ hai ở Đông Dương (1919-1929), thực hiện Pháp tập trung đầu
            tư vào đồn điền cao su.
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionBox;
