import { ArrowDown01, Filter } from "lucide-react";
import AddClassBtn from "../Components/addClassBtn";
import CreateUpLevelClass from "../Components/createUpLevelClass";
import { ClassGroup } from "../../../Homework/AddHomework/libs/interfaces";

interface ClassActionsProps {
  classGroupList: ClassGroup[];
  setClassGroupList: React.Dispatch<React.SetStateAction<ClassGroup[]>>;
}

const ClassActions: React.FC<ClassActionsProps> = (props) => {
  const { classGroupList, setClassGroupList } = props;

  return (
    <div className="flex flex-col md:flex-row items-center justify-between">
      <div className="text-xl font-medium">Danh sách lớp</div>
      <div className="flex items-center justify-between gap-2">
        <AddClassBtn classGroupList={classGroupList} setClassGroupList={setClassGroupList} />

        <CreateUpLevelClass />

        <div className="flex h-10 items-center gap-2 rounded-md bg-white px-2 text-sm font-semibold shadow-md hover:cursor-pointer hover:bg-slate-100">
          <ArrowDown01 className="size-4 text-gray-600" />
          <span>Đánh số báo danh</span>
        </div>
        <div className="flex h-10 items-center gap-2 rounded-md bg-white px-2 text-sm font-semibold shadow-md hover:cursor-pointer hover:bg-slate-100">
          <Filter className="size-4 text-gray-600" />
          <span>Bộ lọc</span>
        </div>
      </div>
    </div>
  );
};

export default ClassActions;
