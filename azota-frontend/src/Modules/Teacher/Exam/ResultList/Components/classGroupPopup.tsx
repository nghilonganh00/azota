import { ChevronDown, ChevronsDownUp, Search } from "lucide-react";
import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import Popup from "../../../../../Globals/Components/popup";
import ClassGroupCollapse from "./classGroupCollapse";
import { ClassGroup } from "../libs/interface";
import { Classroom } from "../../../../../Globals/Interfaces/info.interface";

interface ClassGroupPopupProps {
  showedClassGroup: ClassGroup;
  setShowClassGroup: React.Dispatch<React.SetStateAction<ClassGroup>>;
  setShowClassroom: React.Dispatch<React.SetStateAction<Classroom | null>>;
  classGroups: ClassGroup[];
}

const ClassGroupPopup: React.FC<ClassGroupPopupProps> = (props) => {
  const { showedClassGroup, setShowClassGroup, setShowClassroom, classGroups } = props;

  const { classgroupName } = showedClassGroup;
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleSelectClassroom = (selectedClassroom: Classroom) => {
    setShowClassroom(selectedClassroom);
    setOpen(false);
  };

  return (
    <Fragment>
      <div
        onClick={() => setOpen(true)}
        className="inline-flex items-center rounded-md bg-blue-800 px-2 py-1.5 hover:cursor-pointer hover:opacity-95"
      >
        <div className="text-xs font-medium text-white">{`Chọn nhóm lớp: ${classgroupName}`}</div>
        <div className="ml-1 size-4 rounded-full bg-white text-center text-xs/4 font-medium">
          {showedClassGroup?.classrooms?.length}
        </div>
        <ChevronDown className="ml-3 text-white" strokeWidth={1.5} />
      </div>

      {isOpen && (
        <Popup isOpen={isOpen} setOpen={setOpen}>
          <div className="h-[88vh] w-[80vw] bg-white p-3">
            <div className="flex w-full items-center justify-between">
              <div className="relative flex-1">
                <input
                  type="text"
                  className="w-full rounded-md border px-2 py-2 text-sm"
                  placeholder="Tìm kiếm theo tên lớp"
                />
                <Search className="absolute right-2 top-2.5 size-4 text-slate-800" strokeWidth={1.5} />
              </div>
              <ChevronsDownUp className="text-gray-800" strokeWidth={1.5} />
            </div>

            <div className="mt-2 h-[520px] space-y-6 overflow-y-scroll rounded-md border border-gray-200 px-2 py-4 shadow">
              {classGroups.map((classGroup) => (
                <ClassGroupCollapse
                  classGroup={classGroup}
                  key={classGroup.classGroupId}
                  handleSelectClassroom={handleSelectClassroom}
                />
              ))}
            </div>

            <div className="float-right mt-4">
              <div
                className="rounded-md bg-gray-200 px-8 py-2.5 hover:cursor-pointer hover:bg-gray-100"
                onClick={() => setOpen(false)}
              >
                <div className="text-sm font-medium text-gray-500">Đóng</div>
              </div>
            </div>
          </div>
        </Popup>
      )}
    </Fragment>
  );
};

export default ClassGroupPopup;
