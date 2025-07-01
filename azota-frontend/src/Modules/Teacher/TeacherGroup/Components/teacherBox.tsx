import { EllipsisVertical } from "lucide-react";
import { TeacherPermission } from "../../../../Globals/Interfaces/info.interface";
import UserAvatar from "../../../../Globals/Components/userAvatar";

interface TeacherBoxProps {
  teacher: TeacherPermission;
}

const TeacherBox = ({ teacher }: TeacherBoxProps) => {
  return (
    <div className="flex items-center justify-between rounded-md bg-zinc-200 px-3 py-3.5 hover:cursor-pointer dark:bg-darkmode-300">
      <div className="flex items-center gap-2">
        <div className="rounded-full bg-gray-300 p-2">
          <UserAvatar fullname={teacher.teacher.user.fullname} className="size-6" />
        </div>
        <div>
          <div className="text-sm font-semibold text-gray-900 dark:text-slate-300">{teacher.teacher.user.fullname}</div>
          <div className="text-xs text-gray-500 dark:text-slate-300">{teacher.teacher.user.email}</div>
        </div>
      </div>

      <EllipsisVertical className="size-5 text-gray-700 dark:text-slate-300" />
    </div>
  );
};

export default TeacherBox;
