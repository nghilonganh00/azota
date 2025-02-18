import { FileCheck } from "lucide-react";

const DocumentBox = () => {
  return (
    <div className="col-span-4 flex items-center gap-4 rounded-md bg-slate-100 p-3">
      <FileCheck className="size-16 text-orange-500" strokeWidth={1.5} />
      <div className="space-y-1">
        <div className="text-sm font-semibold">Đề thi thử THPT Quốc gia số 8</div>
        <div className="text-xs font-semibold">Khối 12 - Toán</div>
        <div className="text-xs font-semibold text-gray-600">
          Ngày cập nhật: <span className="text-gray-900">22/06/2024 20:20</span>
        </div>
        <div className="text-xs font-semibold text-gray-600">
          Nguời soạn: <span className="text-gray-900">Hoàng Nghĩa Toàn</span>
        </div>
      </div>
    </div>
  );
};

export default DocumentBox;
