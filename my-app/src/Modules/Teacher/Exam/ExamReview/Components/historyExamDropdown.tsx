import { Link, useParams } from "react-router-dom";
import MenuDropdown from "../../../../../Globals/Components/Dropdown/menudropdown";
import { ExamResult } from "../../../../../Globals/Interfaces/interface";
import { isoDateUtil } from "../../../../../Utils/date";

interface HistoryExamDropdownProps {
  historyExam: ExamResult[] | undefined;
}

const HistoryExamDropdown: React.FC<HistoryExamDropdownProps> = (props) => {
  const { historyExam } = props;

  const { examResultId } = useParams();

  return (
    <MenuDropdown>
      <MenuDropdown.Button>
        <div className="mt-4 rounded-md border border-gray-200 py-2 text-center shadow hover:cursor-pointer">
          <div className="font-medium text-gray-500">{`Xem các lần Thi (${historyExam?.length ?? "0"})`}</div>
        </div>
      </MenuDropdown.Button>

      <MenuDropdown.Panel>
        <div className="h-72 max-w-56 overflow-y-scroll rounded-md bg-white px-0.5 shadow-md">
          {historyExam?.map((result, key) => {
            const { id, mark, examresStarted, examresSaved } = result;

            return (
              <MenuDropdown.Item>
                <Link to={`/teacher/exam/exam-review/${id}`} key={key}>
                  <div
                    className={
                      "space-y-1 rounded-md border-b border-gray-200 p-2 hover:cursor-pointer hover:bg-slate-100" +
                      (examResultId === id.toString() && "bg-slate-100")
                    }
                  >
                    <div className="text-sm font-medium">{`Lần ${historyExam.length - key} [điểm ${mark}]`}</div>
                    <div className="text-xs text-slate-600">
                      10/06/2024 15:55 - 16:31
                    </div>
                    <div className="text-xs text-slate-600">
                      {`Thời gian làm bài: ${isoDateUtil.calculateDiff(examresStarted, examresSaved)}`}
                    </div>
                  </div>
                </Link>
              </MenuDropdown.Item>
            );
          })}
        </div>
      </MenuDropdown.Panel>
    </MenuDropdown>
  );
};

export default HistoryExamDropdown;
