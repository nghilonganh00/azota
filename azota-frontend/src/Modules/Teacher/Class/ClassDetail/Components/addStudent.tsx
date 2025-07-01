import { Fragment, useState, useEffect } from "react";
import { FileText } from "lucide-react";
import Popup from "../../../../../Globals/Components/popup";
import { StudentClass } from "../../../../../Globals/Interfaces/info.interface";
import { useParams } from "react-router";
import { StudentClassroomAPI } from "../../../../../API/studentClassAPI";
import { Gender } from "../../../../../Globals/Constant/constant";
import { NewStudentClass } from "../Interface/interface";

interface AddStudentProps {
  listStudent: StudentClass[];
  setListStudent: (listStudent: StudentClass[]) => void;
}

const AddStudent: React.FC<AddStudentProps> = ({ listStudent, setListStudent }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const { classId } = useParams();

  const [newStudent, setNewStudent] = useState<NewStudentClass>({
    fullname: "",
    identificationNumber: "",
    gender: "MALE",
    DOB: "",
    phone: "",
    email: "",
    classroomId: classId ? parseInt(classId) : -1,
  });

  const handleChangeValue = (name: string, newValue: string) => {
    const regex = /^[0-9]*$/;
    if (name === "identificationNumber" && !regex.test(newValue)) return;

    setNewStudent((preValue) => ({ ...preValue, [name]: newValue }));
  };

  const handleSubmit = async () => {
    const response = await StudentClassroomAPI.create(newStudent);
    if (response) {
      setListStudent([...listStudent, response.data]);  
    }
  };

  console.log("new student: ", newStudent);

  useEffect(() => {
    if (classId) {
      handleChangeValue("classId", classId);
    }
  }, [classId]);

  return (
    <Fragment>
      <div
        className="flex items-center gap-2 rounded-md bg-blue-800 px-3 py-2.5 shadow-sm hover:cursor-pointer hover:bg-blue-700"
        onClick={() => setOpen(true)}
      >
        <FileText strokeWidth={1.5} className="size-4 text-white" />
        <div className="text-sm font-semibold text-white">Thêm học sinh</div>
      </div>

      <Popup isOpen={isOpen} setOpen={setOpen}>
        <form action="" className="w-[750px] max-w-[80vw] rounded-md bg-white p-3">
          <div className="flex items-center text-sm">
            <div className="border-b-2 border-blue-900 px-4 py-2 font-semibold">Thêm Học sinh</div>
            <div className="px-4 py-2">Thêm nhanh bằng file excel</div>
            <div className="px-4 py-2">Thêm nhanh số điện thoại hoặc email</div>
          </div>

          <div className="space-y-3 px-3 py-3">
            <input
              id="studentName"
              name="fullname"
              value={newStudent.fullname}
              onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
              type="text"
              className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm shadow-sm"
              placeholder="Nhập họ và tên"
            />

            <input
              id=""
              type="text"
              name="identificationNumber"
              value={newStudent.identificationNumber}
              onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
              className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm shadow-sm"
              placeholder="Số báo danh"
            />

            <div className="flex items-center justify-between rounded-md border border-gray-300 px-2 py-2 shadow-sm">
              <div className="text-sm">Giới tính</div>
              <div className="flex items-center gap-4 pr-8">
                <label>
                  <input
                    type="radio"
                    id="studentGender"
                    name="gender"
                    value={Gender.MALE}
                    checked={newStudent.gender === Gender.MALE}
                    onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
                  />{" "}
                  Nam
                </label>

                <label>
                  <input
                    type="radio"
                    id=""
                    name="gender"
                    value={Gender.FEMALE}
                    checked={newStudent.gender === Gender.FEMALE}
                    onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
                  />{" "}
                  Nữ
                </label>

                <label>
                  <input
                    type="radio"
                    id=""
                    name="gender"
                    value={Gender.OTHER}
                    checked={newStudent.gender === Gender.OTHER}
                    onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
                  />{" "}
                  Khác
                </label>
              </div>
            </div>

            <div className="relative">
              <input
                type="date"
                name="DOB"
                value={newStudent.DOB}
                onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-normal shadow-sm"
              />

              {/* <input
                className="absolute left-0 top-0 h-full w-full"
                type="text"
              /> */}
            </div>

            <input
              id="className"
              type="text"
              name="phone"
              value={newStudent.phone}
              onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
              className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm shadow-sm"
              placeholder="Số điện thoại"
            />

            <input
              id="className"
              type="email"
              name="email"
              value={newStudent.email}
              onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
              className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm shadow-sm"
              placeholder="Nhập email"
            />
          </div>

          <div className="mt-2 flex items-center justify-end gap-4">
            <div
              className="rounded-md bg-gray-100 px-8 py-2.5 hover:cursor-pointer"
              onClick={() => setOpen(false)}
            >
              <div className="text-sm font-semibold text-slate-500">Hủy</div>
            </div>

            <div
              onClick={handleSubmit}
              className="rounded-md bg-blue-800 px-10 py-2.5 hover:cursor-pointer hover:bg-blue-700"
            >
              <div className="text-sm font-semibold text-white">Xác nhận</div>
            </div>
          </div>
        </form>
      </Popup>
    </Fragment>
  );
};

export default AddStudent;
