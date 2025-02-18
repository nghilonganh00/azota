import { CircleX, FilePen, Tags, Trash2 } from "lucide-react";
import { Question } from "../../ExamReview/libs/interface";
import OptionAPI from "../../../../../API/optionAPI";
import OptionButton from "./optionButton";
import { useState } from "react";

interface QuestionBoxProps {
  question: Question;
}

const QuestionBox: React.FC<QuestionBoxProps> = (props) => {
  const { question } = props;
  const { rawIndex, questionTopic, scorePerQuestion, Options } = question;

  const [isOpenExplain, setOpenExplain] = useState(false);

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-end gap-2 rounded-md bg-white px-2 py-2.5 shadow-sm">
        <div className="rounded-md border border-gray-300 p-1 shadow-sm">
          <Trash2 className="size-4" strokeWidth={1.5} />
        </div>

        <div className="text-sm text-gray-700">|</div>
        <div className="flex items-center gap-2 rounded-full bg-gray-300 px-3 py-0.5">
          <div className="text-xs font-semibold">NB</div>
          <CircleX className="size-4 text-gray-600" />
        </div>
        <div className="text-sm text-gray-700">|</div>

        <div className="flex items-center gap-1 rounded-full py-0.5">
          <Tags className="size-4" strokeWidth={1.4} />
          <div className="text-sm">Gắn nhãn</div>
        </div>
        <div className="text-sm text-gray-700">|</div>

        <div className="flex items-center gap-1 rounded-full py-0.5">
          <FilePen className="size-4" strokeWidth={1.5} />
          <div className="text-sm">Sửa nội dung</div>
        </div>
        <div className="text-sm text-gray-700">|</div>
        <div className="flex items-center gap-1">
          <div className="text-sm font-medium">Điểm:</div>
          <input
            type="text"
            className="w-14 rounded-md border border-gray-300 py-1 text-center text-sm shadow-sm"
            value={scorePerQuestion}
          />
        </div>
      </div>

      <div className="mt-2 rounded-md bg-white p-4 shadow-sm">
        <div className="border-b border-gray-200">
          <div className="text-sm font-medium">{`Câu ${rawIndex}`}</div>
          <div>{questionTopic}</div>
          <div className="mt-4 grid grid-cols-12 gap-y-4 pb-10">
            {Options.map((option, key) => (
              <div className="col-span-6" key={key}>
                <div className="text-sm">
                  <span className="font-medium">{option.key}. </span>
                  {option.optionContent}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2">
            {Options.map((option, key) => (
              <OptionButton option={option} key={key} />
            ))}
          </div>
          <div
            className="text-sm font-medium hover:cursor-pointer"
            onClick={() => setOpenExplain(!isOpenExplain)}
          >
            {isOpenExplain ? "Ẩn giải thích" : "Hiển giải thích"}
          </div>
        </div>

        {isOpenExplain && (
          <div className="text-sm">
            <div>(NB):</div>
            <div>Phương pháp: SGK Lịch sử 12, trang 76 – 77.</div>
            <div>
              Cách giải: Trong cuộc khai thác thuộc địa lần thứ hai ở Đông Dương (1919-1929), thực
              dân Pháp tập trung đầu tư vào đồn điền cao su.
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionBox;
