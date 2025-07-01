import { useEffect, useState } from "react";
import { FileText, QrCode, Search, Settings, Share2 } from "lucide-react";
import StudentTable from "../Components/studentTable";
import { useParams } from "react-router";
import { Classroom, StudentClass } from "../../../../../Globals/Interfaces/info.interface";
import AddStudent from "../Components/addStudent";
import { AxiosResponse } from "axios";
import { ClassroomAPI } from "../../../../../API/classroomAPI";

const ListStudent = () => {
  const { classId } = useParams();
  const [classroom, setClassroom] = useState<Classroom | null>(null);
  const [listStudent, setListStudent] = useState<StudentClass[]>([]);
  const [homeworkTotal, setHomeworkTotal] = useState<number>(0);

  useEffect(() => {
    const fetchStudentProfile = async () => {
      if (classId) {
        const response: AxiosResponse | null = await ClassroomAPI.getStudents(classId);
        console.log("student profile: ", response);
        if (!response) {
          return;
        }
        const data = response.data;
        setClassroom(data);
        setListStudent(data?.studentClasses || []);
        setHomeworkTotal(data?.assignments?.length || 0);
      }
    };

    fetchStudentProfile();
  }, []);

  return (
    <div className="space-y-6 px-4 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-gray-800 dark:text-slate-300">
            <span className="mr-2 text-xl font-semibold">{classroom?.className}</span>
            <span className="">{classroom?.classYear}</span>
          </div>

          <QrCode className="text-blue-800" />
        </div>

        <div className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-2 py-1 text-gray-500 dark:text-slate-300">
          <Share2 className="size-4" strokeWidth={1.5} />
          <div className="text-xs font-semibold">Chia sẻ</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative">
          <input
            type="text"
            className="w-60 rounded-md border border-gray-300 px-2.5 py-2 text-sm dark:border-none dark:border-darkmode-300 dark:bg-darkmode-800"
            placeholder="Tìm theo tên, sđt, email"
          />
          <Search className="absolute right-2.5 top-3 size-4 text-slate-600 dark:text-slate-300" />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-md bg-blue-800 px-3 py-2.5 shadow-sm">
            <FileText strokeWidth={1.5} className="size-4 text-white" />
            <div className="text-sm font-semibold text-white">Xuất danh sách HS</div>
          </div>

          <div className="flex items-center gap-2 rounded-md bg-blue-800 px-3 py-2.5 shadow-sm">
            <FileText strokeWidth={1.5} className="size-4 text-white" />
            <div className="text-sm font-semibold text-white">Xuất bảng điểm</div>
          </div>

          <AddStudent listStudent={listStudent} setListStudent={setListStudent} />

          <div className="rounded-md bg-white p-2 shadow dark:bg-darkmode-600">
            <Settings strokeWidth={1.5} className="size-5 dark:text-slate-300" />
          </div>
        </div>
      </div>

      <StudentTable homeworkTotal={homeworkTotal} listStudent={listStudent} setListStudent={setListStudent} />
    </div>
  );
};

export default ListStudent;
