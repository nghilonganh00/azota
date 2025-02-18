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

    console.log("handle submit: ", response);

    handleChangeValue("className", "");
  };

  const handleSubmitAndClose = async () => {
    await handleSubmit();

    setOpenAdd(false);
  };

  console.log("class group list: ", classGroupList);

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
        <form action="" className="w-[550px] rounded-md bg-white shadow">
          <div className="border-b border-gray-200 p-3 text-sm font-semibold">Thêm lớp học</div>

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
                className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm shadow-sm"
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
                className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm shadow-sm"
                placeholder="Nhập năm học"
              />
            </div>

            <div className="rounded-md border border-gray-200">
              <div className="bg-slate-200 p-3 text-sm">Chọn nhóm lớp</div>
              <div className="grid grid-cols-12 px-4 pt-4">
                {classGroupList?.map((classGroup) => (
                  <div className="col-span-4" key={classGroup.id}>
                    <div className="flex items-center gap-3">
                      <input
                        name="classGroup"
                        type="radio"
                        checked={values["classGroupId"] === classGroup.id}
                        onChange={() => handleChangeValue("classGroupId", classGroup.id)}
                        className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600"
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
              className="rounded-md bg-gray-200 px-8 py-2.5 hover:cursor-pointer hover:bg-gray-100"
              onClick={handleToggleAdd}
            >
              <div className="text-sm font-semibold text-gray-500">Hủy</div>
            </div>

            <div
              className="rounded-md bg-blue-800 px-8 py-2.5 hover:cursor-pointer hover:bg-blue-700"
              onClick={handleSubmit}
            >
              <div className="text-sm font-semibold text-white">Lưu</div>
            </div>

            <div
              className="rounded-md bg-cyan-600 px-4 py-2.5 hover:cursor-pointer hover:bg-cyan-500"
              onClick={handleSubmitAndClose}
            >
              <div className="text-sm font-semibold text-white">Lưu và đóng</div>
            </div>
          </div>
        </form>
      </Popup>
    </Fragment>
  );
};

export default AddClassBtn;
