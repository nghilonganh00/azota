import { useEffect, useState } from "react";
import { FileText, QrCode, Search, Settings, Share2 } from "lucide-react";
import StudentTable from "../Components/studentTable";
import { useParams } from "react-router";
import StudentProfileAPI from "../../../../../API/studentProfileAPI";
import { Class } from "../../../../../Globals/Interfaces/interface";
import { Student } from "../Interface/interface";
import AddStudent from "../Components/addStudent";

const ListStudent = () => {
  const { classId } = useParams();
  const [classroom, setClassroom] = useState<Class>({} as Class);
  const [listStudent, setListStudent] = useState<Student[]>([]);

  console.log("classId: ", classId);

  useEffect(() => {
    const fetchStudentProfile = async () => {
      if (classId) {
        const data = await StudentProfileAPI.get(classId);
        console.log("student profile: ", data);

        setClassroom(data.classroomObj);
        setListStudent(data.studentObjs);
      }
    };

    fetchStudentProfile();
  }, []);

  return (
    <div className="space-y-6 px-4 py-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <span className="mr-2 text-xl font-semibold text-gray-800">
              {classroom.className}
            </span>
            <span className="text-gray-800">{classroom.classYear}</span>
          </div>

          <QrCode className="text-blue-800" />
        </div>

        <div className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-2 py-1">
          <Share2 className="size-4 text-gray-500" strokeWidth={1.5} />
          <div className="text-xs font-semibold text-gray-500">Chia sẻ</div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative">
          <input
            type="text"
            className="w-60 rounded-md border border-gray-300 px-2.5 py-2 text-sm"
            placeholder="Tìm theo tên, sđt, email"
          />
          <Search className="absolute right-2.5 top-3 size-4 text-slate-600" />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-md bg-blue-800 px-3 py-2.5 shadow-sm">
            <FileText strokeWidth={1.5} className="size-4 text-white" />
            <div className="text-sm font-semibold text-white">
              Xuất danh sách HS
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-md bg-blue-800 px-3 py-2.5 shadow-sm">
            <FileText strokeWidth={1.5} className="size-4 text-white" />
            <div className="text-sm font-semibold text-white">
              Xuất bảng điểm
            </div>
          </div>

          <AddStudent />

         

          <div className="rounded-md bg-white p-2 shadow">
            <Settings strokeWidth={1.5} className="size-5" />
          </div>
        </div>
      </div>

      <StudentTable listStudent={listStudent} />
    </div>
  );
};

export default ListStudent;
