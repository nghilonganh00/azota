import { AlignJustify, Divide, Search } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { Classroom, Student } from "../libs/interface";
import Popup from "../../../../../Globals/Components/popup";
import Searchbar from "../../../../../Globals/Components/Searchbar/searchbar";
import StudentAPI from "../../../../../API/studentAPI";

interface ClassroomPopupProps {
  classroom: Classroom;
  assignedStudentIds: number[];
  setAssignedStudentIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const ClassroomPopup: React.FC<ClassroomPopupProps> = (props) => {
  const { classroom, assignedStudentIds, setAssignedStudentIds } = props;

  // Bản nháp lưu danh sách sinh viên. Nhấn "Lưu" để đồng bộ.
  const [assignedStudentIdsDraft, setAssignedStudentIdsDraft] = useState<
    number[]
  >([] as number[]);

  const examId = sessionStorage.getItem("examId");

  const { className } = classroom;

  const [isOpenPopup, setOpenPopup] = useState<boolean>(false);
  const [students, setStudents] = useState<Student[]>([]);

  // Cập nhật trong bản nháp
  const handleAssignStudentInDraft = (studentId: number) => {
    setAssignedStudentIdsDraft((preValue) =>
      preValue.includes(studentId)
        ? preValue.filter((e) => e !== studentId)
        : [...preValue, studentId],
    );
  };

  const handleSave = () => {
    setAssignedStudentIds(assignedStudentIdsDraft);
    setOpenPopup(false);
  };

  const fetchStudentExamAssignmentsData = async () => {
    if (examId) {
      const data = await StudentAPI.getExamAssignments(
        classroom.id,
        Number(examId),
      );

      setStudents(data);
    }
  };

  useEffect(() => {
    if (isOpenPopup) fetchStudentExamAssignmentsData();
  }, [isOpenPopup]);

  useEffect(() => {
    if (assignedStudentIds) setAssignedStudentIdsDraft(assignedStudentIds);
  }, [assignedStudentIds]);

  return (
    <Fragment>
      <div
        className="col-span-4 flex items-center gap-2 hover:cursor-pointer hover:text-blue-700"
        onClick={() => setOpenPopup(true)}
      >
        <AlignJustify strokeWidth={1.5} className="size-4" />
        <div className="text-sm">{`${classroom.className}(${classroom.studentCount})`}</div>
      </div>

      {isOpenPopup && (
        <Popup isOpen={isOpenPopup} setOpen={setOpenPopup}>
          <div className="w-[1000px] shadow">
            <div className="rounded-t-md bg-slate-100 px-3 py-3.5">
              <div className="font-medium">{className} (Đã chọn: 3)</div>

              <div className="mt-2 flex items-center justify-between">
                <Searchbar
                  placeholder="Tìm theo tên học sinh"
                  className="w-[270px]"
                />

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <input type="checkbox" className="size-4" />
                    <label htmlFor="" className="text-sm">
                      Chọn tất cả
                    </label>
                  </div>

                  <div className="flex items-center gap-1">
                    <input type="checkbox" className="size-4" />
                    <label htmlFor="" className="text-sm">
                      Học sinh đã chọn
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-3 pt-5">
              <div className="grid grid-cols-12 gap-y-4 rounded-b-md bg-white">
                {students?.map((student, key) => (
                  <div className="col-span-4" key={key}>
                    <div className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        className="size-4"
                        defaultChecked={assignedStudentIds?.includes(
                          parseInt(student.id),
                        )}
                        onChange={() =>
                          handleAssignStudentInDraft(parseInt(student.id))
                        }
                      />
                      <label htmlFor="" className="text-sm">
                        {student.studentName}
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <div
                  className="mt-4 inline-block rounded-md bg-blue-800 px-8 py-2 text-sm font-semibold text-white hover:cursor-pointer hover:bg-blue-700"
                  onClick={handleSave}
                >
                  Lưu
                </div>
              </div>
            </div>
          </div>
        </Popup>
      )}
    </Fragment>
  );
};

export default ClassroomPopup;
