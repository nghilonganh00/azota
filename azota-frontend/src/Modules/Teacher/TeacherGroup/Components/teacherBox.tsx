import { EllipsisVertical } from "lucide-react";

const TeacherBox = () => {
  return (
    <div className="flex items-center justify-between rounded-md bg-zinc-200 px-1 py-1.5 hover:cursor-pointer">
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-gray-300 p-2">
          <div className="flex size-5 items-center justify-center text-lg font-semibold">LT</div>
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900">Lê Văn Thư</div>
          <div className="text-xs text-gray-500">thienlove6d@gmail.com</div>
        </div>
      </div>

      <EllipsisVertical className="size-5 text-gray-700" />
    </div>
  );
};

export default TeacherBox;
