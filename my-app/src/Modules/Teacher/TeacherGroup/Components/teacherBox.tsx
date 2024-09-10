import { EllipsisVertical } from "lucide-react";

const TeacherBox = () => {
  return (
    <div className="bg-zinc-200 flex items-center justify-between px-1 py-1.5 rounded-md hover:cursor-pointer">
      <div className="flex items-center gap-2">
        <div className="bg-gray-300 rounded-full p-2">
          <div className="size-5 flex items-center justify-center text-lg font-semibold">
            LT
          </div>
        </div>
        <div>
          <div className="font-semibold text-sm text-gray-900">Lê Văn Thư</div>
          <div className="text-xs text-gray-500">thienlove6d@gmail.com</div>
        </div>
      </div>

      <EllipsisVertical className="size-5 text-gray-700" />
    </div>
  );
};

export default TeacherBox;
