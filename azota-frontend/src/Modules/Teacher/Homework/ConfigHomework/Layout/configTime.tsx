import { History, Info } from "lucide-react";
import { isoDateUtil } from "../../../../../Utils/date";
import { Homework } from "../../../../../Globals/Interfaces/homework.interface";

interface ConfigTimerProps {
  values: Homework;
  onChange: (name: string, newValue: any) => void;
}

const ConfigTime: React.FC<ConfigTimerProps> = (props) => {
  const { values, onChange } = props;

  const handleResetDate = () => {
    console.log("timer");
    onChange("startDate", null);
    onChange("endDate", null);
  };

  return (
    <div className="grid grid-cols-12 gap-x-3">
      <div className="col-span-12">
        <label htmlFor="" className="mb-2 flex items-center gap-2 text-sm font-medium">
          Thời gian nộp bài
          <Info className="size-4 text-gray-800" strokeWidth={1.5} />
        </label>
      </div>
      <div className="relative col-span-5">
        <input
          type="datetime-local"
          value={isoDateUtil.toDateAndTime(values.startDate)}
          onChange={(e) => onChange("startDate", e.target.value)}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-medium shadow-sm"
        />
      </div>
      <div className="relative col-span-5">
        <input
          type="datetime-local"
          value={isoDateUtil.toDateAndTime(values.endDate)}
          onChange={(e) => onChange("endDate", e.target.value)}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-medium shadow-sm"
        />
      </div>
      <div className="col-span-2">
        <div
          className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 px-1 py-2 shadow-sm hover:cursor-pointer hover:bg-gray-100"
          onClick={handleResetDate}
        >
          <History className="size-4 text-gray-500" strokeWidth={1.5} />
          <div className="text-sm font-semibold text-gray-500">Đặt lại</div>
        </div>
      </div>

      <div className="col-span-12">
        <div className="pt-2 text-xs text-gray-700">Bỏ trống nếu không muốn giới hạn thời gian.</div>
      </div>
    </div>
  );
};

export default ConfigTime;
