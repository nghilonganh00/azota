import { Check, ChevronDown, CircleX, EllipsisVertical, Paperclip } from "lucide-react";
import EnterMark from "./enterMark";

interface QuestionBoxProps {
  partKey: string;
  questionKey: string;
  examJSON: any;
  setExamJSON: React.Dispatch<React.SetStateAction<any>>;
}

const QuestionBox: React.FC<QuestionBoxProps> = (props) => {
  const { partKey, questionKey, examJSON, setExamJSON } = props;
  const { topic, options, rightAnswer } = examJSON[partKey]["questions"][questionKey];

  const handleChangeRightAnswer = (partKey: string, questionKey: string, optionKey: string, isAnswer: boolean) => {
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

    newExamJSON[partKey]["questions"][questionKey]["options"][optionKey]["isAnswer"] = !isAnswer;

    setExamJSON(() => newExamJSON);
  };

  return (
    <div className="w-full rounded-md border border-gray-400 bg-white py-6">
      <div className="flex items-center gap-2 px-7 text-sm">
        <div className="rounded-sm border border-gray-400 px-3 py-0.5">
          <div className="text-sm font-semibold text-blue-600">{questionKey}</div>
        </div>

        <EnterMark partKey={partKey} questionKey={questionKey} examJSON={examJSON} setExamJSON={setExamJSON} />

        <div className="flex items-center border-r border-gray-400 pr-3 text-blue-800">
          <Paperclip strokeWidth={1.5} className="size-4" />

          <div>Audio </div>
        </div>

        <div className="flex items-end border-r border-gray-400 py-0.5 pr-3 text-gray-500">
          <div>Trắc nghiệm</div>
          <ChevronDown strokeWidth={1.5} className="size-4" />
        </div>

        <div className="border-r border-gray-300 py-0.5 pr-3">
          <div className="flex items-center gap-1 rounded-full bg-gray-300 px-3 py-0.5">
            <div className="text-xs font-semibold">NB</div>
            <CircleX className="size-4 text-gray-600" />
          </div>
        </div>

        <div className="hover:cursor-pointer hover:bg-gray-100">
          <EllipsisVertical className="size-4 text-gray-700" strokeWidth={1.5} />
        </div>
      </div>

      <div className="mt-2 space-y-1 px-7">
        <div className="rounded-sm border border-gray-300 p-1">
          <div className="text-sm">{topic}</div>
        </div>

        {Object.keys(options).map((optionKey, key) => {
          const option = options[optionKey];
          const { content, isAnswer } = option;

          return (
            <div
              className="relative flex items-center justify-start gap-1 hover:cursor-pointer"
              key={option.id}
              onClick={() => handleChangeRightAnswer(partKey, questionKey, optionKey, isAnswer)}
            >
              {isAnswer && <Check className="-ml-4 size-3 text-blue-700" strokeWidth={5} />}

              <div
                className={
                  "rounded-sm border p-1 px-1.5 " + (isAnswer ? "border-blue-700 text-blue-700" : "border-gray-300")
                }
              >
                <div className="text-sm font-semibold">{optionKey}</div>
              </div>

              <div
                className={
                  "rounded-sm border p-1 pl-1.5 pr-5 " +
                  (isAnswer ? "border-blue-700 text-blue-700" : "border-gray-300")
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

        <div className="text-[13px]/5 text-slate-600">
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
