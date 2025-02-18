import { Option } from "../../../../../Globals/Interfaces/exam.interface";
import { Question } from "../../../../Teacher/Exam/ExamReview/libs/interface";

interface TakeExamAreaProps {
  examingQuestion: Question;
  selectedOption: Option | null;
  setSelectOption: React.Dispatch<React.SetStateAction<Option | null>>;
  isShowPartName: boolean;
}

const TakeExamArea: React.FC<TakeExamAreaProps> = (props) => {
  const { examingQuestion, selectedOption, setSelectOption, isShowPartName } = props;

  const { rawIndex, questionTopic, QuestionPart, Options } = examingQuestion;

  const handleSelectOption = (option: Option) => {
    setSelectOption(option);
  };

  return (
    <div className="px-3 pt-20">
      <div className="rounded-md bg-white shadow">
        <div className="relative border-b border-slate-200 p-3">
          <div className="mb-2 text-sm font-semibold">{isShowPartName && QuestionPart.questionPartName}</div>
          <div className="text-sm font-semibold">{`Câu ${rawIndex}`}</div>
          <div className="text-sm">{questionTopic}</div>
          <div className="absolute w-full text-center">
            <div className="inline-block bg-white px-4 text-sm font-medium text-gray-700">Chọn một đáp án đúng</div>
          </div>
        </div>

        <div className="mt-4 space-y-2 p-3">
          {/* {Options?.map((option, key) => (
            <div
              onClick={() => handleSelectOption(option)}
              className="flex items-center gap-2 hover:cursor-pointer"
              key={key}
            >
              <div
                className={
                  "flex size-10 items-center justify-center rounded-full border border-gray-400 p-4 " +
                  (selectedOption?.id === option.id ? "border-transparent bg-orange-500 text-white" : "bg-white")
                }
              >
                <div className="">{option.key}</div>
              </div>

              <div
                className={
                  "rounded-md border px-2 py-2 " +
                  (selectedOption?.id === option.id ? "border-orange-500" : "border-gray-400")
                }
              >
                <div className="text-sm">{option.optionContent}</div>
              </div>
            </div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default TakeExamArea;
