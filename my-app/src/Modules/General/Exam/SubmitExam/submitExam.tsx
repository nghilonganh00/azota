import {
  CheckCircle2,
  ChevronRight,
  ClipboardPenLine,
  Clock,
  Info,
  User,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ExamResultAPI from "../../../../API/examResultAPI";
import { ExamResult } from "./libs/interface";
import { isoDateUtil } from "../../../../Utils/date";

const SubmitExam = () => {
  const navigate = useNavigate();
  const { examResultId } = useParams();

  const [examResult, setExamResult] = useState<ExamResult>();

  const {
    examResult: {
      mark = 0,
      questionTotal = 0,
      rightAnswer = 0,
      examresStarted = "",
      createdAt = "",
    } = {},
    examObj: { hashId = "", examName = "" } = {},
    studentObj: { studentName = "" } = {},
  } = examResult || {};

  const handlePraticeAgain = () => {
    navigate(`/exam/take-training/${hashId}`);
  };

  useEffect(() => {
    const fetchExamResultData = async () => {
      if (examResultId) {
        const data = await ExamResultAPI.getMark(examResultId);

        setExamResult(data);
      }
    };
    fetchExamResultData();
  }, []);

  console.log("exam result: ", examResult);

  return (
    <div className="w-full pt-10 text-sm">
      <div className="mx-auto w-[670px] rounded-md bg-white text-center shadow">
        <div className="border-b border-gray-200">
          <div className="pb-5 pt-8 text-lg font-semibold">
            Bài làm của bạn đã được gửi đi
          </div>

          <div className="pb-4">
            <span className="text-sm font-medium">Điểm của bạn: </span>{" "}
            <span className="ml-3 text-2xl font-medium">{`${mark}/10`}</span>
          </div>
        </div>

        <div className="px-4 py-3">
          <div className="mb-4 text-center font-medium">{examName}</div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User strokeWidth={1.5} className="size-4" />
                <div className="">Thí sinh</div>
              </div>

              <div className="text-sm font-medium">{studentName}</div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock strokeWidth={1.5} className="size-4" />
                <div className="">Thời gian làm bài</div>
              </div>

              {examResult && (
                <div className="text-sm font-medium">
                  {isoDateUtil.calculateDiff(examresStarted, createdAt)}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <CheckCircle2
                  strokeWidth={1.5}
                  className="size-4 text-lime-600"
                />
                <div className="">Số câu trắc nghiệm đúng</div>
              </div>

              <div className="text-sm font-medium text-lime-500">
                {rightAnswer}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <XCircle strokeWidth={1.5} className="size-4 text-red-600" />
                <div className="">Số câu trắc nghiệm sai</div>
              </div>

              <div className="text-sm font-medium text-red-600">
                {(questionTotal ?? 0) - (rightAnswer ?? 0)}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Info strokeWidth={1.5} className="size-4 text-zinc-500" />
                <div className="">Tổng số câu hỏi trong đề</div>
              </div>

              <div className="text-sm font-medium text-zinc-500">1</div>
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <div className="flex-1">
              <div className="flex items-center justify-center rounded bg-[#68cc0033] py-2 hover:cursor-pointer">
                <div className="font-medium text-[rgb(var(--color-success))]">
                  Xem thống kê năng lực
                </div>
              </div>
            </div>

            {examResult?.examObj?.examType === "TEST" && (
              <div className="flex-1">
                <div
                  onClick={handlePraticeAgain}
                  className="flex items-center justify-center gap-1 rounded border border-orange-600 py-2 text-orange-600 hover:cursor-pointer"
                >
                  <div className="font-medium">Luyện tập tiếp</div>

                  <ClipboardPenLine strokeWidth={1.5} className="size-4" />
                </div>
              </div>
            )}

            <div className="flex-1">
              <div className="gap flex items-center justify-center rounded border border-blue-800 py-2 text-blue-800 hover:cursor-pointer">
                <div className="font-medium">Xem đáp án</div>

                <ChevronRight strokeWidth={1.5} className="size-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubmitExam;
