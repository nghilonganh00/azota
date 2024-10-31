import {
  AlignJustify,
  CheckCircle2,
  FilePenLine,
  Filter,
  PanelLeftClose,
  RotateCcw,
  XCircle,
} from "lucide-react";
import { ExamReviewI, GroupedQuestionPart } from "../libs/interface";
import { groupQuestionsByPart } from "../libs/utils";

interface ReviewExamContentProps {
  examReview: ExamReviewI;
}

const ReviewExamContent: React.FC<ReviewExamContentProps> = (props) => {
  const { examReview } = props;
  const { examObj, examResult, correctQuestionIds } = examReview;
  console.log("correct: ", correctQuestionIds);
  const { Questions } = examObj || {};

  const questionParts: GroupedQuestionPart[] =
    Questions && groupQuestionsByPart(Questions);
  console.log("questions: ", questionParts);

  let examresAnswers = examResult?.examresAnswers ?? " ";
  examresAnswers = examresAnswers.replace(/\\/g, "");

  let examresAnswersObj: any;
  try {
    examresAnswersObj = JSON.parse(examresAnswers);
    console.log("examresAnswers: ", examresAnswersObj);
  } catch (error) {
    console.error("Failed to parse examresAnswers JSON:", error);
    examresAnswersObj = null;
  }

  return (
    <div className="flex-1">
      <div className="flex w-full items-center gap-2 rounded-md bg-white p-2 shadow-sm">
        <div className="max-w-min rounded-md border border-slate-300 p-2 shadow-sm">
          <PanelLeftClose className="size-4 text-slate-800" strokeWidth={1} />
        </div>

        <div className="flex-1 text-center">
          <div className="text-sm font-medium text-gray-700">
            {examObj?.examName}
          </div>
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
          <div className="border-b-2 border-black px-6 py-3 font-medium">
            Trắc nghiệm
          </div>
        </div>

        {questionParts?.map((questionPart, key) => (
          <div className="mt-6 px-6 text-sm" key={key}>
            <div className="font-semibold text-gray-800">
              {questionPart.questionPartName}
            </div>
            <div className="space-y-14">
              {questionPart?.questions.map((question, key) => {
                const { id, rawIndex, questionTopic, Options } = question;
                return (
                  <div key={key}>
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

                    <div className="mt-2">{questionTopic}</div>

                    <div className="mt-6 space-y-6">
                      {Options.map((option, key) => {
                        const { key: questionKey, optionContent } = option;
                        return (
                          <div key={key}>
                            <span className="font-semibold">
                              {questionKey}.
                            </span>{" "}
                            {optionContent}
                          </div>
                        );
                      })}
                    </div>

                    <div className="mt-4 flex items-center justify-end gap-2">
                      <div
                        className={
                          "text-base font-medium " +
                          (correctQuestionIds.includes(id)
                            ? "text-green-600"
                            : "text[red]")
                        }
                      >
                        Đáp án đúng:
                        {Options.map(
                          (option) => option.isAnswer && option.key + " ",
                        )}
                      </div>

                      <div
                        className={
                          "flex items-center gap-4 rounded border px-6 py-2 text-base " +
                          (correctQuestionIds.includes(id)
                            ? "border-green-600"
                            : "border-red-600")
                        }
                      >
                        {Options.sort((a, b) => (a.key > b.key ? 1 : -1)).map(
                          (option, key) => {
                            return (
                              <div className="relative">
                                {option.isAnswer && (
                                  <div className="absolute">
                                    {correctQuestionIds.includes(id) ? (
                                      <CheckCircle2
                                        className="text-green-600"
                                        strokeWidth={1.5}
                                      />
                                    ) : (
                                      <XCircle
                                        className="text-red-600"
                                        strokeWidth={1.5}
                                      />
                                    )}
                                  </div>
                                )}
                                <div
                                  className="w-10 text-right font-medium"
                                  key={key}
                                >
                                  {option.key}
                                </div>
                              </div>
                            );
                          },
                        )}
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
