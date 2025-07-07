import { Exam, Option, Question, QuestionPart } from "../../../../../Globals/Interfaces/exam.interface";
import { ExamAnswer } from "../../TakeTraining/libs/interface";
import { CryptoUtil } from "../../../../../Utils/crypto";

interface TakeExamAreaProps {
  questionParts: QuestionPart[];
  examAnswers: ExamAnswer[];
  setExamAnswers: React.Dispatch<React.SetStateAction<ExamAnswer[]>>;
  exam: Exam;
}

const TakeExamArea: React.FC<TakeExamAreaProps> = (props) => {
  const { questionParts, examAnswers, setExamAnswers, exam } = props;
  const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || "AZOTA-19012003-EXAM-KEY";
  console.log("encrytion key: ", ENCRYPTION_KEY);

  const isSelectedOption = (questionId: number, optionId: number) => {
    const question = examAnswers.find((question) => question.QuestionId === questionId);

    if (!question) return false;

    return question.AnswerContent.find((selectedOption) => selectedOption.Index === optionId);
  };

  const handleSelectOption = (question: Question, selectedOption: Option) => {
    console.log("exam answers: ", examAnswers);

    if (isSelectedOption(question.id, selectedOption.id)) {
      setExamAnswers((pre) =>
        pre
          .map((examAnswer) =>
            examAnswer.QuestionId === question.id
              ? {
                  ...examAnswer,
                  AnswerContent: examAnswer.AnswerContent.filter((option) => option.Index !== selectedOption.id),
                }
              : examAnswer,
          )
          .filter((examAnswers) => examAnswers.AnswerContent.length > 0),
      );
    } else {
      setExamAnswers((pre) => {
        const existingAnswerIndex = pre.findIndex((answer) => answer.QuestionId === question.id);

        if (existingAnswerIndex !== -1) {
          return pre.map((examAnswer, index) =>
            index === existingAnswerIndex
              ? {
                  ...examAnswer,
                  AnswerContent: [
                    // ...examAnswer.AnswerContent,
                    { Index: selectedOption.id, Content: selectedOption.key },
                  ],
                }
              : examAnswer,
          );
        } else {
          const newAnswer: ExamAnswer = {
            Answered: 1,
            QuestionId: question.id,
            AnswerContent: [{ Index: selectedOption.id, Content: selectedOption.key }],
          };

          return [...pre, newAnswer];
        }
      });
    }
  };

  return (
    <div className="col-span-9">
      {questionParts?.map((questionPart) => (
        <div className="bg-white" key={questionPart.id}>
          <p className="rounded-t px-4 pt-4 text-sm font-semibold shadow">{questionPart.title}</p>

          <div className="space-y-8">
            {questionPart.questions?.map((question, index) => (
              <div className="rounded bg-white shadow" key={question.id}>
                <div className="relative border-b border-slate-200 p-4 pb-6">
                  <div className="text-sm font-semibold">{`Câu ${index + 1}`}</div>
                  <p className="break-words text-sm">{CryptoUtil.decrypt(ENCRYPTION_KEY, question.topic)}</p>
                  <div className="absolute w-full text-center">
                    <div className="inline-block bg-white px-8 py-3.5 text-sm font-medium text-gray-600">
                      Chọn một đáp án đúng
                    </div>
                  </div>
                </div>

                <div className="space-y-2 px-4 py-6">
                  {question.options
                    ?.sort((a, b) => a.key.localeCompare(b.key))
                    .map((option) => (
                      <div
                        className="flex items-center gap-2 px-4 hover:cursor-pointer"
                        key={option.id}
                        onClick={() => handleSelectOption(question, option)}
                      >
                        <div
                          className={
                            "flex size-10 items-center justify-center rounded-full border border-gray-400" +
                            (isSelectedOption(question.id, option.id)
                              ? "border-transparent bg-orange-500 text-white"
                              : "bg-white")
                          }
                        >
                          <div className="">{option.key}</div>
                        </div>

                        <div
                          className={
                            "inline-block max-w-full rounded-md border border-gray-400 px-2 py-2 " +
                            (isSelectedOption(question.id, option.id) ? "border-orange-500" : "border-gray-400")
                          }
                        >
                          <p className="break-words text-sm">{CryptoUtil.decrypt(ENCRYPTION_KEY, option.content)}</p>
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
