import { Plus, PlusIcon, X } from "lucide-react";
import Popup from "../../../../../Globals/Components/popup";
import { useState, Fragment } from "react";
import { ClassGroup } from "../../../Homework/AddHomework/libs/interfaces";
import CreateClassGroup from "./createClassGroup";
import { ClassroomAPI } from "../../../../../API/classroomAPI";

interface AddClassBtnProps {
  classGroupList: ClassGroup[];
  setClassGroupList: React.Dispatch<React.SetStateAction<ClassGroup[]>>;
}

const AddClassBtn: React.FC<AddClassBtnProps> = (props) => {
  const { classGroupList, setClassGroupList } = props;

  const [isOpenAdd, setOpenAdd] = useState<boolean>(false);

  const [values, setValues] = useState({
    className: "",
    classYear: "",
    classGroupId: -2,
  });

  const handleToggleAdd = () => {
    setOpenAdd(() => !isOpenAdd);
  };

  const handleChangeValue = (name: string, newValue: string | number) => {
    setValues((preValue) => ({ ...preValue, [name]: newValue }));
  };

  const handleSubmit = async () => {
    const { className, classYear, classGroupId } = values;
    const response: any = await ClassroomAPI.create(className, classYear, classGroupId);

    const data = response.data;

    setClassGroupList((preList) => {
      return preList?.map((classGroup) => {
        if (classGroup.id === classGroupId) {
          return {
            ...classGroup,
            classrooms: [...classGroup.classrooms, { ...data, classrooms: [] }],
          };
        }
        return classGroup;
      });
    });

    handleChangeValue("className", "");
  };

  const handleSubmitAndClose = async () => {
    await handleSubmit();

    setOpenAdd(false);
  };

  return (
    <Fragment>
      <div
        onClick={() => setOpenAdd(true)}
        className="flex h-10 items-center gap-2 rounded-md bg-blue-800 px-4 shadow-md hover:cursor-pointer hover:bg-blue-700"
      >
        <PlusIcon className="size-4 text-white" />
        <span className="text-sm font-bold text-white">Tạo lớp học</span>
      </div>

      <Popup isOpen={isOpenAdd} setOpen={setOpenAdd}>
        <form
          onSubmit={handleSubmitAndClose}
          className="dark:bg-darkmode-600 w-[550px] rounded-md bg-white shadow dark:text-slate-300"
        >
          <div className="dark:border-darkmode-400 border-b border-gray-200 p-3 text-sm font-semibold">
            Thêm lớp học
          </div>

          <div className="space-y-2 px-5 py-2">
            <div className="space-y-1.5">
              <label htmlFor="className" className="text-sm">
                Tên lớp
              </label>
              <input
                id="className"
                value={values["className"]}
                name="className"
                onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
                type="text"
                className="dark:bg-darkmode-800 w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm shadow-sm dark:border-none"
                placeholder="Nhập tên lớp"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor="className" className="text-sm">
                Năm học
              </label>
              <input
                id="classYear"
                value={values["classYear"]}
                name="classYear"
                onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
                type="text"
                className="dark:bg-darkmode-800 w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm shadow-sm dark:border-none"
                placeholder="Nhập năm học"
              />
            </div>

            <div className="dark:border-darkmode-400 rounded-md border border-gray-200">
              <div className="dark:bg-darkmode-400 bg-slate-200 p-3 text-sm">Chọn nhóm lớp</div>
              <div className="grid grid-cols-12 gap-y-2 px-4 pt-4">
                {classGroupList?.map((classGroup) => (
                  <div className="col-span-4" key={classGroup.id}>
                    <div className="flex items-center gap-3">
                      <input
                        name="classGroup"
                        type="radio"
                        checked={values["classGroupId"] === classGroup.id}
                        onChange={() => handleChangeValue("classGroupId", classGroup.id)}
                        className="dark:bg-darkmode-800 h-4 w-4 border-gray-300 bg-gray-100 text-blue-600"
                      />
                      <div>{classGroup.classgroupName}</div>
                    </div>
                  </div>
                ))}
              </div>

              <CreateClassGroup setClassGroupList={setClassGroupList} />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 p-3">
            <div
              className="dark:bg-darkmode-400 dark:hover:bg-darkmode-300 rounded-md bg-gray-200 px-8 py-2.5 hover:cursor-pointer hover:bg-gray-100"
              onClick={handleToggleAdd}
            >
              <div className="text-sm font-semibold text-gray-500 dark:text-slate-200">Hủy</div>
            </div>

            <button
              type="button"
              className="rounded-md bg-blue-800 px-8 py-2.5 hover:cursor-pointer hover:bg-blue-700 disabled:cursor-default disabled:opacity-25 disabled:hover:bg-blue-800"
              onClick={handleSubmit}
              disabled={!(values["className"] && values["classYear"])}
            >
              <div className="text-sm font-semibold text-white">Lưu</div>
            </button>

            <button
              type="submit"
              className="rounded-md bg-cyan-600 px-4 py-2.5 hover:cursor-pointer hover:bg-cyan-500 disabled:cursor-default disabled:opacity-25 disabled:hover:bg-cyan-600"
              disabled={!(values["className"] && values["classYear"])}
              onClick={handleSubmitAndClose}
            >
              <div className="text-sm font-semibold text-white">Lưu và đóng</div>
            </button>
          </div>
        </form>
      </Popup>
    </Fragment>
  );
};

export default AddClassBtn;
