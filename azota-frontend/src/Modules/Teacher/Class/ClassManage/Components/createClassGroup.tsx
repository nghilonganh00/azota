import { Plus, X } from "lucide-react";
import { useState } from "react";
import ClassGroupAPI from "../../../../../API/classGroupAPI";
import { ClassGroup } from "../../../Homework/AddHomework/libs/interfaces";

interface CreateClassGroupProps {
  setClassGroupList: React.Dispatch<React.SetStateAction<ClassGroup[]>>;
}

const CreateClassGroup: React.FC<CreateClassGroupProps> = (props) => {
  const { setClassGroupList } = props;

  const [isOpen, setOpen] = useState<boolean>(false);
  const [classgroupName, setclassgroupName] = useState<string>("");

  const handleCreateClassGroup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // e.preventDefault();

    const response = await ClassGroupAPI.create(classgroupName);
    const newClassGroup = response;

    if (newClassGroup) {
      setClassGroupList((preValue) => [{ ...newClassGroup, classrooms: [] }, ...preValue]);
    }
  };

  return (
    <div className="flex items-center gap-2 px-3 py-4 text-blue-800">
      {!isOpen ? (
        <div
          className="flex items-center gap-2 px-3 py-4 text-blue-800 hover:cursor-pointer hover:text-blue-600"
          onClick={() => setOpen(true)}
        >
          <Plus strokeWidth={2.5} className="size-3" />
          <div className="text-sm font-medium">Thêm nhóm</div>
        </div>
      ) : (
        <div className="flex items-center gap-2 px-3 py-4 text-blue-800">
          <input
            id="className"
            type="text"
            value={classgroupName}
            onChange={(e) => setclassgroupName(e.target.value)}
            className="dark:bg-darkmode-800 w-48 rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm dark:border-none"
            placeholder="Tên nhóm, VD: khối 1, khối"
          />
          <button
            type="button"
            className="ml-2 rounded-md bg-blue-800 px-3.5 py-2 hover:cursor-pointer hover:bg-blue-700"
            // disabled={classgroupName === ""}
            onClick={handleCreateClassGroup}
          >
            <div className="text-sm font-medium text-white">Tạo nhóm</div>
          </button>

          <div className="rounded-md bg-slate-200 p-3 hover:cursor-pointer" onClick={() => setOpen(false)}>
            <X className="size-4 text-slate-600" />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateClassGroup;
