import {
  AlignJustify,
  Camera,
  ChevronDown,
  ChevronRight,
  FilePenLine,
  Filter,
  PanelLeftClose,
  PanelRightClose,
  RotateCcw,
  Search,
} from "lucide-react";
import { ExamReview } from "../libs/interface";
import { GroupedQuestionPart } from "../../../../Teacher/Exam/ExamReview/libs/interface";
import { groupQuestionsByPart } from "../../../../Teacher/Exam/ExamReview/libs/utils";

interface AnswerAreaProps {
  examReview: ExamReview;
}

const AnswerArea: React.FC<AnswerAreaProps> = (props) => {
  const { examReview } = props;
  const exam = examReview.examObj || {};
  const examResult = examReview.examResult || {};
  const correctQuestionIds = examReview.correctQuestionIds || [];

  const questionParts: GroupedQuestionPart[] = exam.Questions && groupQuestionsByPart(exam.Questions);
  console.log("questions: ", questionParts);

  return (
    <div className="col-span-8 h-96 md:col-span-9">
      <div className="rounded-md bg-white p-2 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="max-w-min rounded-md border border-slate-300 p-2 shadow-sm">
            <PanelLeftClose className="size-4 text-slate-800" strokeWidth={1} />
          </div>

          <div className="mx-auto text-sm font-semibold text-gray-600">{exam.examName}</div>

          <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-2 py-1.5 text-sm shadow hover:cursor-pointer hover:bg-slate-100">
            <Filter className="size-4 text-gray-500" strokeWidth={1.5} />
            <span className="text-xs font-semibold text-gray-500">Bộ lọc</span>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-md bg-white py-1 shadow-sm">
        {questionParts?.map((questionPart) => (
          <div className="mt-6 px-6 text-sm" key={questionPart.id}>
            <div className="font-semibold text-gray-800">{questionPart.questionPartName}</div>
            <div className="space-y-14">
              {questionPart?.questions.map((question) => {
                const { id, rawIndex, questionTopic, Options } = question;
                return (
                  <div key={question.id}>
                    <div className="mt-3 font-semibold">{`Câu ${rawIndex}`}</div>

                    <div className="mt-2">{questionTopic}</div>

                    <div className="mt-6 space-y-6">
                      {Options.map((option) => {
                        const { key: questionKey, optionContent } = option;
                        return (
                          <div key={option.id}>
                            <span className="font-semibold">{questionKey}.</span> {optionContent}
                          </div>
                        );
                      })}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-orange-500 hover:cursor-pointer">
                        <div className="font-medium">Giải thích</div>
                        <ChevronDown className="size-6" strokeWidth={1.5} />
                      </div>
                      <div className="mt-4 flex items-center justify-end gap-2">
                        <div
                          className={
                            "text-base font-medium " +
                            (correctQuestionIds.includes(id) ? "text-green-600" : "text[red]")
                          }
                        >
                          {`Đáp án đúng: `}
                          {Options.map((option, key) => option.isAnswer && option.key + " ")}
                        </div>

                        <div
                          className={
                            "flex items-center gap-4 rounded border px-6 py-2 text-base " +
                            (correctQuestionIds.includes(id) ? "border-green-600" : "border-red-600")
                          }
                        >
                          {/* {examresAnswersObj?.map((examresAnswers, key) => {
    
                            })} */}
                          <div className="w-10 text-right font-medium">A</div>
                          <div className="w-10 text-right font-medium">B</div>
                          <div className="w-10 text-right font-medium">C</div>
                          <div className="w-10 text-right font-medium">D</div>
                        </div>
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

export default AnswerArea;
