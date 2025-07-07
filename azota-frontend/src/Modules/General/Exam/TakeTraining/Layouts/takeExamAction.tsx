import { Check, ClipboardList, RotateCcw } from "lucide-react";
import ActionButton from "../Components/actionButton";
import NotificationPopup from "../Components/notificationPopup";
import { QuestionResult } from "../libs/interface";
import { Exam, Option, Question } from "../../../../../Globals/Interfaces/exam.interface";

interface TakeExamActionProps {
  exam: Exam;
  examingQuestion: Question;
  questionResult: QuestionResult;
  selectedOption: Option | null;
  handleCheckAnswer: () => void;
  handleNextQuestion: () => void;
  isShowNoti: boolean;
  setShowNoti: React.Dispatch<React.SetStateAction<boolean>>;
}

const TakeExamAction: React.FC<TakeExamActionProps> = (props) => {
  const {
    exam,
    examingQuestion,
    questionResult,
    selectedOption,
    handleCheckAnswer,
    handleNextQuestion,
    isShowNoti,
    setShowNoti,
  } = props;

  return (
    <div className="fixed bottom-0 left-0 flex w-screen items-center justify-between bg-white px-3 py-2 text-sm">
      <div className="flex items-center gap-6 pl-2">
        <div className="flex items-center gap-2 text-blue-700">
          <RotateCcw strokeWidth={1.5} className="size-5" />
          <div className="font-medium">Bắt đầu lại</div>
        </div>

        <div className="flex items-center gap-2 text-blue-800">
          <ClipboardList strokeWidth={1.5} className="size-5" />
          <div className="font-medium">{`Câu ${examingQuestion?.rawIndex}/${exam?.questionParts?.length}`}</div>
        </div>

        <div className="flex flex-1 items-center gap-2">
          <Check strokeWidth={1.5} className="size-4 text-green-500" />
          {exam?.questionParts?.map((question) => (
            <div key={question.id} className="size-2 rounded-full border-2 border-gray-400"></div>
          ))}
        </div>
      </div>
      <div className="relative">
        <ActionButton
          questionResult={questionResult}
          selectedOption={selectedOption}
          handleCheckAnswer={handleCheckAnswer}
          handleNextQuestion={handleNextQuestion}
        />

        <NotificationPopup
          isShowNoti={isShowNoti}
          setShowNoti={setShowNoti}
          questionResult={questionResult}
          handleNextQuestion={handleNextQuestion}
        />
      </div>
    </div>
  );
};

export default TakeExamAction;
