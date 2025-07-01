import { useEffect, useState } from "react";
import { ChevronDown, FileText, Filter, Plus, Search } from "lucide-react";
import { useParams } from "react-router";
import HomeworkAPI from "../../../../../API/homeworkAPI";
import { GroupedHomework } from "../Interface/interface";
import HomeworkUtils from "../Utils/homeworkUtil";
import GroupedHomeworkList from "../Components/groupedHomework";

const ListHomeworkAndExam = () => {
  const { classId } = useParams();
  const [groupedHomework, setGroupedHomework] = useState<GroupedHomework>({} as GroupedHomework);

  useEffect(() => {
    const fetchHomeworks = async () => {
      if (classId) {
        const data = await HomeworkAPI.getAllByClassId(classId);
        setGroupedHomework(() => HomeworkUtils.groupByCreatedAt(data));
      }
    };

    fetchHomeworks();
  }, []);

  console.log("grouped homework: ", groupedHomework);

  return (
    <div className="space-y-4 px-3 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              className="w-60 rounded-md px-2.5 py-2 text-sm shadow-sm dark:bg-darkmode-800"
              placeholder="Tìm kiếm"
            />
            <Search className="absolute right-2.5 top-3 size-4 text-slate-600 dark:text-slate-300" />
          </div>

          <div className="flex items-center gap-2 rounded-md bg-white px-2 py-2 text-sm font-semibold text-gray-800 shadow-lg hover:cursor-pointer hover:bg-slate-100 dark:bg-darkmode-600 dark:text-slate-300">
            <Filter className="size-4" strokeWidth={1.5} />
            <span className="text-sm">Bộ lọc</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 rounded-md bg-blue-800 px-3 py-2.5">
          <Plus strokeWidth={1.5} className="size-4 text-white" />
          <div className="text-sm font-semibold text-white">Giao bài mới</div>
        </div>
      </div>

      <div className="text-lg font-semibold text-gray-800 dark:text-slate-300">Danh sách các bài đã giao</div>

      <div className="space-y-4">
        {Object.keys(groupedHomework)?.map((createdAt) => {
          return <GroupedHomeworkList groupedHomework={groupedHomework} createdAt={createdAt} />;
        })}

        {Object.keys(groupedHomework).length === 0 && (
          <div className="flex h-60 w-full items-center justify-center rounded dark:bg-darkmode-600">
            <div className="text-lg font-semibold text-white">Chưa có bài tập, đề thi nào!</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListHomeworkAndExam;
