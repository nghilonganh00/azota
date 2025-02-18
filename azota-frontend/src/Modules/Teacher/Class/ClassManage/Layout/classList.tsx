import { ChevronDown, ChevronsDownUp, Search } from "lucide-react";
import ClassBox from "../Components/classBox";
import { ClassGroup } from "../../../Homework/AddHomework/libs/interfaces";
import ClassGroupBox from "../Components/classGroupBox";

interface ClassListProps {
  classGroupList: ClassGroup[];
}

const ClassList: React.FC<ClassListProps> = (props) => {
  const { classGroupList } = props;

  return (
    <div className="rounded-sm bg-white p-3">
      <div className="flex items-center">
        <div className="relative flex-1">
          <input
            type="text"
            className="w-full rounded-md border border-solid border-slate-200 px-2 py-2 text-sm shadow-sm"
            placeholder="Tìm kiếm theo tên lớp"
          />
          <Search className="absolute right-3 top-2.5 size-4 text-slate-600" />
        </div>
        <ChevronsDownUp className="text-slate-600" />
      </div>

      {classGroupList?.map((classgroup: ClassGroup, key: number) => (
        <ClassGroupBox classGroup={classgroup} key={classgroup.id} />
      ))}
    </div>
  );
};

export default ClassList;
