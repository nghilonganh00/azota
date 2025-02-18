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
              className="w-60 rounded-md px-2.5 py-2 text-sm shadow-sm"
              placeholder="Tìm kiếm"
            />
            <Search className="absolute right-2.5 top-3 size-4 text-slate-600" />
          </div>

          <div className="flex items-center gap-2 rounded-md bg-white px-2 py-2 text-sm font-semibold shadow-lg hover:cursor-pointer hover:bg-slate-100">
            <Filter className="size-4 text-gray-800" strokeWidth={1.5} />
            <span className="text-sm font-semibold text-gray-800">Bộ lọc</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-2 rounded-md bg-blue-800 px-3 py-2.5">
          <Plus strokeWidth={1.5} className="size-4 text-white" />
          <div className="text-sm font-semibold text-white">Giao bài mới</div>
        </div>
      </div>

      <div className="text-lg font-semibold text-gray-800">Danh sách các bài đã giao</div>

      <div className="space-y-4">
        {Object.keys(groupedHomework).map((createdAt) => {
          return <GroupedHomeworkList groupedHomework={groupedHomework} createdAt={createdAt} />;
        })}
      </div>
    </div>
  );
};

export default ListHomeworkAndExam;
