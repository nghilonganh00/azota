import { Search } from "lucide-react";
import TeacherBox from "../Components/teacherBox";
import AddTeacherButton from "../Components/AddTeacherButton";
import teacherPermissionAPI from "../../../../API/teacherPermissionAPI";
import { useEffect, useState } from "react";
import { TeacherPermission } from "../../../../Globals/Interfaces/info.interface";

const TeacherListArea = () => {
  const [teachers, setTeachers] = useState<TeacherPermission[]>([]);

  useEffect(() => {
    const fetchTeachersData = async () => {
      const response = await teacherPermissionAPI.getTeachersByPrincipal();
      if (response?.status === 200) {
        console.log(response.data);
        setTeachers(response.data);
      } else {
        console.log(response);
      }
    };

    fetchTeachersData();
  }, []);

  return (
    <div className="h-full rounded-md bg-white px-2 dark:bg-darkmode-600">
      <div className="flex items-center gap-2 border-b border-solid border-gray-200 py-2 dark:border-darkmode-300">
        <div className="relative">
          <input
            type="text"
            className="w-64 rounded-md border border-solid border-slate-200 px-2 py-2 text-sm shadow-sm dark:border-none dark:bg-darkmode-800"
            placeholder="Tìm tên, phone hoặc Email"
          />
          <Search className="absolute right-3 top-2.5 size-4 text-slate-500 dark:text-slate-300" />
        </div>
        <AddTeacherButton />
      </div>

      <div className="mt-4 space-y-3 pr-2">
        {teachers.map((teacher) => (
          <TeacherBox key={teacher.id} teacher={teacher} />
        ))}
      </div>
    </div>
  );
};

export default TeacherListArea;
