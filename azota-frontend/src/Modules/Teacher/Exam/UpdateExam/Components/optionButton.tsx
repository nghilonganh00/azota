import { useState } from "react";
import { Option } from "../../ExamReview/libs/interface";
import OptionAPI from "../../../../../API/optionAPI";

interface OptionButtonProps {
  option: Option;
}

const OptionButton: React.FC<OptionButtonProps> = (props) => {
  const { option: data } = props;
  const [option, setOption] = useState<Option>(data);

  const handleChangeAnswer = async (optionId: string) => {
    setOption((preValue) => ({ ...preValue, isCorrect: !preValue.isCorrect }));
    const response = await OptionAPI.changeIsAnswer(optionId);
  };
  return (
    <div
      onClick={() => handleChangeAnswer(option.id.toString())}
      className={
        "size-9 rounded-full border border-gray-200 pr-0.5 text-center hover:cursor-pointer " +
        (option.isCorrect ? "bg-orange-500 text-white hover:bg-orange-500/85" : "text-gray-800")
      }
    >
      <span className="text-sm/9 font-medium">{option.key}</span>
    </div>
  );
};

export default OptionButton;
