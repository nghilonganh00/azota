import { ChevronLeft, ChevronRight, FileClock } from "lucide-react";
import StudentAvatar from "../../../Homework/ResultsList/Components/avatar";
import { ExamReviewI } from "../libs/interface";
import MenuDropdown from "../../../../../Globals/Components/Dropdown/menudropdown";
import { isoDateUtil } from "../../../../../Utils/date";
import HistoryExamDropdown from "../Components/historyExamDropdown";

interface ReviewDetailProps {
  examReview: ExamReviewI | null;
}

const ReviewDetail: React.FC<ReviewDetailProps> = (props) => {
  const { examReview } = props;
  const {
    examObj,
    examResult,
    historyExamResultObjs,
    studentObj,
    markedByObj,
  } = examReview || {};

  return (
    <div className="h-[800px] w-[25%] rounded-md bg-white shadow">
      <div className="flex items-center gap-2 border-b border-slate-200 p-3">
        <StudentAvatar fullname="Lê Văn Thiện" />
        <div className="text-sm font-medium">{studentObj?.studentName}</div>
        <span
          className={`material-symbols-outlined text-xl ${studentObj?.studentGender ? "text-blue-800" : "text-[#fe00a1]"}`}
        >
          {studentObj?.studentGender ? "male" : "female"}
        </span>
      </div>

      <div className="p-3">
        <div className="rounded-md shadow">
          <div className="rounded-t-md bg-slate-200 p-3 text-sm">
            Thông tin chi tiết
          </div>
          <div className="p-3 font-medium">
            {"Điểm: "}
            <span className="text-lg">{examResult?.mark}/10</span>
          </div>
          <div className="space-y-2 px-3 pb-3 text-sm">
            <div>{`Trắc nghiệm: ${examResult?.mark} (${examResult?.rightAnswer}/${examResult?.questionTotal} câu)`}</div>
            <div>{`Giáo viên chấm: ${markedByObj?.userFullName}`}</div>
            <div>
              Xem chi tiết quá trình làm bài:{" "}
              <FileClock
                className="c-lucide size-5 text-blue-800"
                strokeWidth={1.5}
              />
            </div>
          </div>
        </div>

        <HistoryExamDropdown historyExam={historyExamResultObjs} />

        <div className="mt-3 flex gap-2">
          <div className="rounded-md bg-gray-300/20 px-2.5 py-2 shadow">
            <ChevronLeft strokeWidth={1.5} className="size-4 text-gray-600" />
          </div>

          <div className="rounded-md bg-gray-300/20 px-2.5 py-2 shadow">
            <ChevronRight strokeWidth={1.5} className="size-4 text-gray-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewDetail;
