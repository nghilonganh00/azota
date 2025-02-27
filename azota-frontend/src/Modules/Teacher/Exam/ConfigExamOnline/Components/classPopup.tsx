import { AlignJustify } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import Popup from "../../../../../Globals/Components/popup";
import Searchbar from "../../../../../Globals/Components/Searchbar/searchbar";
import StudentAPI from "../../../../../API/studentAPI";
import { Classroom } from "../../../../../Globals/Interfaces/info.interface";
import { Student } from "../../../../../Globals/Interfaces/user.interface";
import { ClassroomAPI } from "../../../../../API/classroomAPI";
import { useParams } from "react-router";
import { StudentClassroomAPI } from "../../../../../API/studentClassAPI";

interface ClassroomPopupProps {
  classroom: Classroom;
  assignedStudentIds: number[];
  setAssignedStudentIds: React.Dispatch<React.SetStateAction<number[]>>;
}

const ClassroomPopup: React.FC<ClassroomPopupProps> = (props) => {
  const { examId } = useParams();

  const { classroom, assignedStudentIds, setAssignedStudentIds } = props;

  const [assignedStudentIdsDraft, setAssignedStudentIdsDraft] = useState<number[]>([] as number[]);

  const { className } = classroom;

  const [isOpenPopup, setOpenPopup] = useState<boolean>(false);
  const [students, setStudents] = useState<Student[]>([]);

  const handleAssignStudentInDraft = (studentId: number) => {
    setAssignedStudentIdsDraft((preValue) =>
      preValue.includes(studentId) ? preValue.filter((e) => e !== studentId) : [...preValue, studentId],
    );
  };

  const handleSave = () => {
    setAssignedStudentIds(assignedStudentIdsDraft);
    setOpenPopup(false);
  };

  const assignedStudenTotal = assignedStudentIds?.filter((assignedStudentId) =>
    classroom.studentClasses.map((student) => student.id).includes(assignedStudentId),
  ).length;

  useEffect(() => {
    const fetchStudentExamAssignmentsData = async () => {
      if (examId) {
        const response = await StudentClassroomAPI.getByClassroomId(classroom.id);

        if (response?.status !== 200) return;

        setStudents(response.data);
      }
    };

    if (isOpenPopup) {
      fetchStudentExamAssignmentsData();
    }
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
        <div className="text-sm">{`${classroom.className} (${assignedStudenTotal}/${classroom.studentClasses.length})`}</div>
      </div>

      {isOpenPopup && (
        <Popup isOpen={isOpenPopup} setOpen={setOpenPopup}>
          <div className="w-[1000px] shadow">
            <div className="rounded-t-md bg-slate-100 px-3 py-3.5 dark:bg-darkmode-400">
              <div className="font-medium">{`${className} (Đã chọn: ${assignedStudenTotal})`}</div>

              <div className="mt-2 flex items-center justify-between">
                <Searchbar placeholder="Tìm theo tên học sinh" className="w-[270px]" />

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

            <div className="bg-white p-3 pt-5 dark:bg-darkmode-600">
              <div className="grid grid-cols-12 gap-y-4 rounded-b-md">
                {students?.map((student) => (
                  <div className="col-span-4" key={student.id}>
                    <div className="flex items-center gap-1">
                      <input
                        type="checkbox"
                        className="size-4"
                        defaultChecked={assignedStudentIds?.includes(student.id)}
                        onChange={() => handleAssignStudentInDraft(student.id)}
                      />
                      <label htmlFor="" className="text-sm">
                        {student.fullname}
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
