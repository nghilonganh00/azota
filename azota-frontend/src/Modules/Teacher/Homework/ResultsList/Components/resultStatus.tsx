import { HomeworkSubmission } from "../../../../../Globals/Interfaces/homework.interface";
import { isoDateUtil } from "../../../../../Utils/date";

interface ResultStatusProps {
  answerHistory: HomeworkSubmission[];
}

const ResultStatus: React.FC<ResultStatusProps> = (props) => {
  const { answerHistory } = props;

  if (answerHistory.length === 0) {
    return <div className="text-xs text-red-500">Chưa nộp</div>;
  }

  const latestResult = answerHistory[answerHistory.length - 1];
  const isConfirmed = latestResult.confirmedAt !== null;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className={`text-xs ${isConfirmed ? "text-gray-700" : "text-red-500"}`}>
          {isConfirmed ? (
            <>
              Điểm:{" "}
              <span className="semibold text-xs font-semibold text-black">
                {latestResult.point || ""}
              </span>
            </>
          ) : (
            "Chưa chấm"
          )}
        </div>
        <div className="text-xs text-gray-700">
          {latestResult.confirmedAt && isoDateUtil.calculateDiffFromNow(latestResult.confirmedAt)}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-700">Số tệp tin đã nộp:</div>
        <div className="text-xs text-gray-700">{latestResult.files.length}</div>
      </div>
    </div>
  );
};

export default ResultStatus;
