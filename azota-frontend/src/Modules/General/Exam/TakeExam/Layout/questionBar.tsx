import { Question } from "../../../../../Globals/Interfaces/exam.interface";
import { ExamAnswer } from "../../TakeTraining/libs/interface";

interface QuestionBarProps {
  questions: Question[];
  examAnswers: ExamAnswer[];
}

const QuestionBar: React.FC<QuestionBarProps> = (props) => {
  const { questions, examAnswers } = props;

  return (
    <div className="col-span-3">
      <div className="fixed right-[20px] top-[83px] w-[calc(92%/4)] rounded bg-white p-3 shadow">
        <div className="text-sm font-medium text-gray-800">Danh sách câu hỏi</div>

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {questions?.map((question, key) => (
            <div
              key={question.id}
              className={
                `flex w-14 items-center justify-center rounded-md border border-gray-300 py-1.5 shadow hover:cursor-pointer ` +
                (examAnswers.find((examAnswer) => examAnswer.QuestionId === question.id)
                  ? "bg-orange-400 text-white"
                  : "text-slate-500")
              }
            >
              <div className="text-sm font-medium">{key + 1}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionBar;
