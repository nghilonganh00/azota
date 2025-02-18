import { FileClock } from "lucide-react";
import { ExamReview } from "../libs/interface";
import CopyBox from "../../../../../Globals/Components/copyBox";

interface ExamInfoAreaProps {
  examReview: ExamReview;
}

const ExamInfoArea: React.FC<ExamInfoAreaProps> = (props) => {
  const { examReview } = props;
  const examResult = examReview.examResult || {};

  return (
    <div className="space-y-3 rounded-md bg-white py-4 text-sm shadow-md">
      <div className="px-4 text-lg font-medium">{`Điểm: ${examResult.mark}/10`}</div>

      <div className="p-2">
        <div className="rounded-md border border-gray-200">
          <div className="rounded-t-md bg-slate-200 p-3">Thông tin chi tiết</div>

          <div className="space-y-2 p-3">
            <div>{`Trắc nghiệm: ${examResult.mark} (${examResult.rightAnswer}/${examResult.questionTotal} câu)`}</div>
            <div className="flex items-center gap-2">
              <div>Xem chi tiết quá trình làm bài: </div>
              <FileClock className="size-5 text-blue-900" strokeWidth={1.6} />
            </div>

            <CopyBox copyText={`http://localhost:3000/exam/answer-exam/1`}>
              <div className="font-medium text-blue-800">Copy link gửi giáo viên</div>
            </CopyBox>
          </div>
        </div>
        <div className="mt-2 rounded-md bg-[#68cc0033] py-2">
          <div className="text-center font-medium text-[#68cc00]">Xem thống kê năng lực</div>
        </div>
      </div>
    </div>
  );
};

export default ExamInfoArea;
