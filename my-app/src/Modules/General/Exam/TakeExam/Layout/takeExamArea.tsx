import { Option } from "../../../../../Globals/Interfaces/interface";
import {
  GroupedQuestionPart,
  Question,
} from "../../../../Teacher/Exam/ExamReview/libs/interface";
import { ExamAnswer } from "../../TakeTraining/libs/interface";

interface TakeExamAreaProps {
  questionParts: GroupedQuestionPart[];
  examAnswers: ExamAnswer[];
  setExamAnswers: React.Dispatch<React.SetStateAction<ExamAnswer[]>>;
}

const TakeExamArea: React.FC<TakeExamAreaProps> = (props) => {
  const { questionParts, examAnswers, setExamAnswers } = props;

  const isSelectedOption = (questionId: number, optionId: number) => {
    const question = examAnswers.find(
      (question) => question.QuestionId === questionId,
    );

    if (!question) return false;

    return question.AnswerContent.find(
      (selectedOption) => selectedOption.Index === optionId,
    );
  };

  const handleSelectOption = (question: Question, selectedOption: Option) => {
    if (isSelectedOption(question.id, selectedOption.id)) {
      setExamAnswers((pre) =>
        pre
          .map((examAnswer) =>
            examAnswer.QuestionId === question.id
              ? {
                  ...examAnswer,
                  AnswerContent: examAnswer.AnswerContent.filter(
                    (option) => option.Index !== selectedOption.id,
                  ),
                }
              : examAnswer,
          )
          .filter((examAnswers) => examAnswers.AnswerContent.length > 0),
      );
    } else {
      setExamAnswers((pre) => {
        const existingAnswerIndex = pre.findIndex(
          (answer) => answer.QuestionId === question.id,
        );

        if (existingAnswerIndex !== -1) {
          return pre.map((examAnswer, index) =>
            index === existingAnswerIndex
              ? {
                  ...examAnswer,
                  AnswerContent: [
                    ...examAnswer.AnswerContent,
                    { Index: selectedOption.id, Content: selectedOption.key },
                  ],
                }
              : examAnswer,
          );
        } else {
          const newAnswer: ExamAnswer = {
            Answered: 1,
            QuestionId: question.id,
            AnswerContent: [
              { Index: selectedOption.id, Content: selectedOption.key },
            ],
          };

          return [...pre, newAnswer];
        }
      });
    }
  };

  console.log("exam answers: ", examAnswers);

  return (
    <div className="col-span-9">
      {questionParts?.map((questionPart, key) => (
        <div className="" key={key}>
          <div className="rounded-t bg-white px-4 pt-4 text-sm font-semibold shadow">
            {questionPart.questionPartName}
          </div>

          <div className="space-y-8">
            {questionPart.questions?.map((question, key) => (
              <div className="rounded bg-white p-4 shadow" key={key}>
                <div className="relative border-b border-slate-200 pb-6">
                  <div className="text-sm font-semibold">{`Câu ${question.rawIndex}`}</div>
                  <div className="text-sm">{question.questionTopic}</div>
                  <div className="absolute w-full text-center">
                    <div className="inline-block bg-white px-8 py-3.5 text-sm font-medium text-gray-600">
                      Chọn một đáp án đúng
                    </div>
                  </div>
                </div>
                <div className="mt-4 space-y-2 py-3">
                  {question.Options?.map((option, key) => (
                    <div
                      className="flex items-center gap-2 hover:cursor-pointer"
                      key={key}
                      onClick={() => handleSelectOption(question, option)}
                    >
                      <div
                        className={
                          "flex size-10 items-center justify-center rounded-full border border-gray-400 p-4" +
                          (isSelectedOption(question.id, option.id)
                            ? "border-transparent bg-orange-500 text-white"
                            : "bg-white")
                        }
                      >
                        <div className="">{option.key}</div>
                      </div>

                      <div
                        className={
                          "rounded-md border border-gray-400 px-2 py-2 " +
                          (isSelectedOption(question.id, option.id)
                            ? "border-orange-500"
                            : "border-gray-400")
                        }
                      >
                        <div className="text-sm">{option.optionContent}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TakeExamArea;
