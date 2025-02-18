import { Option } from "../../../../../Globals/Interfaces/exam.interface";
import { QuestionResult } from "../libs/interface";

interface ActionButtonProps {
  questionResult: QuestionResult;
  selectedOption: Option | null;
  handleCheckAnswer: () => void;
  handleNextQuestion: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = (props) => {
  const { questionResult, selectedOption, handleCheckAnswer, handleNextQuestion } = props;

  const { correct, firstTime } = questionResult;

  const handleClick = () => {
    correct ? handleNextQuestion() : handleCheckAnswer();
  };

  console.log("selected option: ", selectedOption === null);
  console.log("result: ", questionResult);

  return (
    <button
      onClick={handleClick}
      disabled={selectedOption === null}
      className={
        "rounded-md bg-blue-800 px-9 py-2.5 " +
        (selectedOption ? "opacity-100 hover:cursor-pointer hover:bg-blue-700" : "opacity-40")
      }
    >
      <div className={"text-sm font-semibold text-white"}>
        {firstTime && "Kiểm tra"}
        {!firstTime && (correct ? "Câu tiếp theo" : "Thử lại")}
      </div>
    </button>
  );
};

export default ActionButton;
