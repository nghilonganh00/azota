import { ChevronLeft, ChevronRight, FileClock, Trash, Trash2 } from "lucide-react";
import StudentAvatar from "../../../Homework/ResultsList/Components/avatar";
import { DateTimeFormat, isoDateUtil } from "../../../../../Utils/date";
import HistoryExamDropdown from "../Components/historyExamDropdown";
import { MarkedExamResult } from "../libs/interface";

interface ReviewDetailProps {
  examReview: MarkedExamResult | null;
  history: MarkedExamResult[];
}

const ReviewDetail: React.FC<ReviewDetailProps> = (props) => {
  const { examReview, history } = props;

  const { fullname, gender } = examReview?.student?.user || {};

  return (
    <div className="h-[800px] w-[25%] rounded-md bg-white shadow">
      <div className="flex items-center gap-2 border-b border-slate-200 p-3">
        <StudentAvatar fullname="Lê Văn Thiện" />
        <div className="text-sm font-medium">{fullname}</div>
        <span className={`material-symbols-outlined text-xl ${gender ? "text-blue-800" : "text-[#fe00a1]"}`}>
          {gender ? "male" : "female"}
        </span>
      </div>

      <div className="p-3">
        <div className="rounded-md shadow">
          <div className="rounded-t-md bg-slate-200 p-3 text-sm">Thông tin chi tiết</div>
          <div className="p-3 font-medium">
            {"Điểm:  "}
            <span className="text-lg">{examReview?.score}/10</span>
          </div>
          <div className="space-y-2 px-3 pb-3 text-sm">
            <div>{`Thời gian làm bài: ${examReview && isoDateUtil.calculateDiff(examReview?.startedAt, examReview?.savedAt)}`}</div>
            <div>{`Thời gian nộp bài: ${examReview && isoDateUtil.toDateAndTime(examReview?.savedAt, DateTimeFormat.FULL_DATE_TIME_FORMAT)}`}</div>
            <div>{`Trắc nghiệm: ${examReview?.score} (${examReview?.correctTotal}/${examReview?.questionTotal} câu)`}</div>
            {/* <div>{`Giáo viên chấm: ${examReview?.?.fullName}`}</div> */}
            <div>
              Xem chi tiết quá trình làm bài: <FileClock className="c-lucide size-5 text-blue-800" strokeWidth={1.5} />
            </div>
            <div>
              Xóa bài thi và cho thi lại: <Trash2 className="c-lucide size-5 text-red-800" strokeWidth={1.5} />
            </div>
            <div>
              Xóa bài thi và cấm học sinh thi: <Trash2 className="c-lucide size-5 text-red-800" strokeWidth={1.5} />
            </div>
          </div>
        </div>

        <HistoryExamDropdown historyExam={history} />

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
