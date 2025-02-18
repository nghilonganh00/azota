import { AlignJustify, Check, FilePenLine, Filter, PanelLeftClose, RotateCcw, X } from "lucide-react";
import { MarkedExamResult } from "../libs/interface";
import { Exam, QuestionPart } from "../../../../../Globals/Interfaces/exam.interface";

interface ReviewExamContentProps {
  examResult: MarkedExamResult;
  exam: Exam;
}

const ReviewExamContent: React.FC<ReviewExamContentProps> = (props) => {
  const { examResult, exam } = props;
  const { correctQuestionIds } = examResult;
  const questionParts: QuestionPart[] = exam.questionParts;

  // Hàm parse câu trả lời từ JSON
  const parseExamAnswers = (examresAnswers: string): Record<string, string> => {
    try {
      const answerData = JSON.parse(examresAnswers);

      if (Array.isArray(answerData)) {
        return answerData.reduce(
          (acc, questionAnswer) => {
            const questionId = questionAnswer?.QuestionId;
            const answerContent = questionAnswer?.AnswerContent?.[0]?.Content;

            if (questionId && answerContent) {
              acc[questionId] = answerContent;
            }
            return acc;
          },
          {} as Record<string, string>,
        );
      } else {
        console.warn("Parsed data is not an array:", answerData);
      }
    } catch (error) {
      console.error("Failed to parse examresAnswers JSON:", {
        error,
        data: examresAnswers,
      });
    }
    return {}; // Trả về object rỗng nếu có lỗi
  };

  const examresAnswers = examResult?.answer?.replace(/\\/g, "") || "";
  const answer = parseExamAnswers(examresAnswers);

  console.log("examresAnswers:", answer);

  return (
    <div className="flex-1">
      <div className="flex w-full items-center gap-2 rounded-md bg-white p-2 shadow-sm">
        <div className="max-w-min rounded-md border border-slate-300 p-2 shadow-sm">
          <PanelLeftClose className="size-4 text-slate-800" strokeWidth={1} />
        </div>

        <div className="flex-1 text-center">
          <div className="text-sm font-medium text-gray-700">{exam.title}</div>
        </div>

        <div className="flex items-center gap-2 rounded-md border border-gray-300 px-2 py-1.5 text-sm font-semibold shadow-sm hover:cursor-pointer hover:bg-slate-100">
          <Filter className="size-4 text-gray-500" strokeWidth={1.5} />
          <span className="text-xs font-medium text-gray-500">Bộ lọc</span>
        </div>

        <div className="rounded-md border border-gray-300 px-2 py-1.5 hover:cursor-pointer">
          <AlignJustify className="size-4 text-gray-500" />
        </div>
      </div>

      <div className="mt-4 rounded-md bg-white shadow-sm">
        <div className="flex items-center text-sm">
          <div className="border-b-2 border-black px-6 py-3 font-medium">Trắc nghiệm</div>
        </div>

        {questionParts?.map((questionPart, key) => (
          <div className="mt-6 px-6 text-sm" key={key}>
            <div className="font-semibold text-gray-800">{questionPart.title}</div>
            <div className="space-y-14">
              {questionPart?.questions.map((question, key) => {
                const { id, rawIndex, topic, options } = question;
                return (
                  <div key={id}>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="font-semibold">{`Câu ${rawIndex}`}</div>
                      <div className="flex items-center gap-1">
                        <div className="rounded-md border border-blue-800 p-1">
                          <FilePenLine className="size-4 text-blue-800" />
                        </div>

                        <div className="rounded-md border border-blue-800 p-1">
                          <RotateCcw className="size-4 text-blue-800" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-2">{topic}</div>

                    <div className="mt-6 space-y-6">
                      {options.map((option) => {
                        const { id, key, content, isCorrect } = option;
                        return (
                          <div key={id}>
                            <span className="font-semibold">{key}.</span> {content}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-4 flex items-center justify-end gap-2">
                      <div
                        className={
                          "text-base font-medium " +
                          (correctQuestionIds.includes(id) ? "text-green-600" : "text-red-600")
                        }
                      >
                        {`Đáp án đúng: `}
                        {options.map((option) => option.isCorrect && option.key + " ")}
                      </div>

                      <div
                        className={
                          "flex items-center gap-4 rounded border px-6 py-2 text-base " +
                          (correctQuestionIds.includes(id) ? "border-green-600" : "border-red-600")
                        }
                      >
                        {options
                          .sort((a, b) => (a.key > b.key ? 1 : -1))
                          .map((option, key) => {
                            return (
                              <div className="relative">
                                {answer?.[String(question.id)] === option.key && (
                                  <div className="absolute">
                                    {correctQuestionIds.includes(id) ? (
                                      <Check className="text-green-600" strokeWidth={1.5} />
                                    ) : (
                                      <X className="text-red-600" strokeWidth={1.5} />
                                    )}
                                  </div>
                                )}
                                <div className="w-10 text-right font-medium" key={key}>
                                  {option.key}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ReviewExamContent;
