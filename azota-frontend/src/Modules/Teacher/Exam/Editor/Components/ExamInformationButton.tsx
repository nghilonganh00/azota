import { CircleAlert } from "lucide-react";
import { useState } from "react";
import getExamStats from "../Utils/getExamStats";

interface ExamInformationButtonProps {
  examJSON: any;
}

const ExamInformationButton: React.FC<ExamInformationButtonProps> = (props) => {
  const { examJSON } = props;

  const [isOpen, setIsOpen] = useState(false);

  const { totalMultiChoice, totalUnanswered, multiChoiceList, unansweredList } = getExamStats(examJSON);

  return (
    <div>
      <div
        className="flex items-center justify-center gap-2 border-x border-slate-300 px-1 py-2.5 hover:cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <CircleAlert strokeWidth={1.6} className="size-4 text-gray-800 dark:text-slate-300" />
        <div className="text-[13px] text-gray-900 dark:text-slate-300">Thông tin đề</div>
      </div>

      {isOpen && (
        <div
          className="fixed right-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-black/50"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-5/6 max-w-[900px] rounded-md border-x border-slate-300 bg-blue-800 px-3 py-1.5 shadow-sm dark:border-none dark:bg-darkmode-600"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="py-3 font-semibold">Thông tin đề</div>

            <div className="py-2">
              <h5>Tổng số câu trong đề thi: {totalMultiChoice} câu</h5>
              <h5>*Số trong () để đánh dấu câu hỏi đó thuộc nhóm hoặc phần của đề thi</h5>
            </div>

            <table className="mt-4 min-w-full divide-x divide-y divide-gray-200 border border-gray-300 py-3 dark:divide-gray-500 dark:border-gray-600">
              <thead>
                <tr>
                  <th className="border-b border-r border-gray-300 px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-100 dark:border-gray-500 dark:text-slate-200">
                    Thông tin
                  </th>
                  <th className="border-b border-r border-gray-300 px-4 py-2 text-center text-xs font-medium uppercase tracking-wider text-gray-100 dark:border-gray-500 dark:text-slate-200">
                    Số lượng
                  </th>
                  <th className="border-b border-gray-300 px-4 py-2 text-left text-xs font-medium uppercase tracking-wider text-gray-100 dark:border-gray-500 dark:text-slate-200">
                    Danh sách các câu
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border-b border-r border-gray-300 px-4 py-3 text-left dark:border-gray-500">
                    Tổng số câu trắc nghiệm
                  </td>
                  <td className="border-b border-r border-gray-300 px-4 py-3 text-center dark:border-gray-500">
                    {totalMultiChoice}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 dark:border-gray-500">
                    {multiChoiceList.join(", ")}
                  </td>
                </tr>
                <tr>
                  <td className="border-b border-r border-gray-300 px-4 py-3 text-left dark:border-gray-500">
                    Tổng số câu chưa chọn đáp án
                  </td>
                  <td className="border-b border-r border-gray-300 px-4 py-3 text-center dark:border-gray-500">
                    {totalUnanswered}
                  </td>
                  <td className="border-b border-gray-300 px-4 py-3 dark:border-gray-500">
                    {unansweredList.join(", ")}
                  </td>
                </tr>
                <tr>
                  <td className="border-r border-gray-300 px-4 py-3 text-left dark:border-gray-500">
                    Tổng số câu không có hướng dẫn giải
                  </td>
                  <td className="border-r border-gray-300 px-4 py-3 text-center dark:border-gray-500">
                    {totalUnanswered}
                  </td>
                  <td className="px-4 py-3">{unansweredList.join(", ")}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamInformationButton;
