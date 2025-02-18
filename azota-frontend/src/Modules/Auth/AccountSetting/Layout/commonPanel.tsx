import { Upload } from "lucide-react";
import StudentAvatar from "../../../Teacher/Homework/ResultsList/Components/avatar";

const CommonPanel = () => {
  return (
    <div>
      <div className="flex items-center gap-4">
        <div className="flex size-24 items-center justify-center rounded-full bg-sky-600">
          <div className="text-6xl text-white">B</div>
        </div>
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 rounded-md border border-blue-800 p-1.5">
            <Upload strokeWidth={1.5} className="size-4 text-blue-700" />
            <div className="text-xs font-semibold text-blue-800">Tải lên</div>
          </div>
          <div className="text-xs text-gray-500">Tải lên file ảnh và kích thước tối đa 5MB</div>
        </div>
      </div>
    </div>
  );
};

export default CommonPanel;
