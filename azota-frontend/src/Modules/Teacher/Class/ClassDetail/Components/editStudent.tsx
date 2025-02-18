import { Fragment, useState } from "react";
import { Edit } from "lucide-react";
import Popup from "../../../../../Globals/Components/popup";
import { Gender } from "../../../../../Globals/Constant/constant";
import { StudentClass } from "../../../../../Globals/Interfaces/info.interface";

interface EditStudentProps {
  studentClass: StudentClass;
}

const EditStudent: React.FC<EditStudentProps> = (props) => {
  const { studentClass } = props;

  const [isOpen, setOpen] = useState<boolean>(false);

  const [editStudent, setEditStudent] = useState<StudentClass>(studentClass);

  const handleChangeValue = (name: string, newValue: string) => {
    const regex = /^[0-9]*$/;
    if (name === "identificationNumber" && !regex.test(newValue)) return;

    setEditStudent((preValue) => ({ ...preValue, [name]: newValue }));
  };

  console.log("student: ", studentClass.student);

  return (
    <Fragment>
      <div
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-md border border-blue-800 px-2 py-1.5 text-blue-800 hover:cursor-pointer hover:bg-slate-200"
      >
        <Edit className="size-4" />
        <div className="text-xs font-semibold">Sửa</div>
      </div>

      <Popup isOpen={isOpen} setOpen={setOpen}>
        <Popup isOpen={isOpen} setOpen={setOpen}>
          <form action="" className="w-[750px] max-w-[80vw] rounded-md bg-white p-3">
            <div className="text-start text-base font-semibold">Sửa thông tin học sinh</div>

            <div className="space-y-3 px-3 py-3">
              <input
                id="studentName"
                name="studentName"
                value={editStudent.fullname}
                onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
                type="text"
                className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm shadow-sm"
                placeholder="Nhập họ và tên"
              />

              <input
                id=""
                type="text"
                name="identificationNumber"
                value={editStudent.identificationNumber}
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
                      name="studentGender"
                      value={Gender.MALE}
                      checked={editStudent.gender.toString() === Gender.MALE}
                      onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
                    />{" "}
                    Nam
                  </label>

                  <label>
                    <input
                      type="radio"
                      id=""
                      name="studentGender"
                      value={Gender.FEMALE}
                      checked={editStudent.gender.toString() === Gender.FEMALE}
                      onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
                    />{" "}
                    Nữ
                  </label>

                  <label>
                    <input
                      type="radio"
                      id=""
                      name="studentGender"
                      value={Gender.OTHER}
                      checked={editStudent.gender.toString() === Gender.OTHER}
                      onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
                    />{" "}
                    Khác
                  </label>
                </div>
              </div>

              <input
                type="date"
                name="studentDOB"
                value={new Date(editStudent.DOB).toISOString().slice(0, 10)}
                onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
                className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm font-normal shadow-sm"
              />

              <input
                id="className"
                type="text"
                name="studentPhone"
                value={editStudent.phone}
                onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
                className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm shadow-sm"
                placeholder="Số điện thoại"
              />

              <input
                id="className"
                type="email"
                name="studentEmail"
                value={editStudent.email}
                onChange={(e) => handleChangeValue(e.target.name, e.target.value)}
                className="w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm shadow-sm"
                placeholder="Nhập email"
              />
            </div>

            <div className="mt-2 flex items-center justify-end gap-4">
              <div className="rounded-md bg-gray-100 px-8 py-2.5 hover:cursor-pointer" onClick={() => setOpen(false)}>
                <div className="text-sm font-semibold text-slate-500">Hủy</div>
              </div>

              <div
                // onClick={handleSubmit}
                className="rounded-md bg-blue-800 px-10 py-2.5 hover:cursor-pointer hover:bg-blue-700"
              >
                <div className="text-sm font-semibold text-white">Xác nhận</div>
              </div>
            </div>
          </form>
        </Popup>
      </Popup>
    </Fragment>
  );
};

export default EditStudent;
