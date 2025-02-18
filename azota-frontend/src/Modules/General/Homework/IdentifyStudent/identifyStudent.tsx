import { useEffect, useState } from "react";
import { QrCode, Search } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import StudentCard from "./Components/studentCard";
import HomeworkAPI from "../../../../API/homeworkAPI";
import { ClassroomAPI } from "../../../../API/classroomAPI";
import UserAPI from "../../../../API/userAPI";
import { HomeworkSubmissionAPI } from "../../../../API/homeworkSubmissionAPI";
import { Homework } from "../../../../Globals/Interfaces/homework.interface";
import { StudentClass } from "../../../../Globals/Interfaces/info.interface";

const IdentifyStudent = () => {
  const navigate = useNavigate();
  const { hashId } = useParams();
  const [homework, setHomework] = useState<Homework>({} as Homework);
  const [students, setStudents] = useState<StudentClass[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!hashId) return;

        const homeworkResponse = await HomeworkAPI.getByHashId(hashId);
        const homeworkData = homeworkResponse?.data;
        setHomework(homeworkData);

        const classroomId = homeworkData?.classroomId;
        let studentsData = [];
        if (classroomId) {
          const studentsResponse = await ClassroomAPI.getStudents(classroomId);
          studentsData = studentsResponse?.data?.studentClasses || [];
          setStudents(studentsData);
        }

        const userResponse = await UserAPI.getInfo();
        const userId = userResponse?.data?.id;

        const matchingStudentClass = studentsData.find(
          (studentClass: any) => studentClass?.student?.user?.id === userId,
        );

        console.log(`matching student class ${JSON.stringify(matchingStudentClass.id)}`);

        if (matchingStudentClass) {
          const response = await HomeworkSubmissionAPI.getByHashIdAndStudentClassId(
            homeworkData.hashId,
            matchingStudentClass.id,
          );

          const homeworkSubmission = response?.data;

          navigate(`/student/homework-submissions/${homeworkSubmission.id}`);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  console.log("student: ", students);

  return (
    <div className="p-4">
      <div className="rounded-md bg-white shadow-sm">
        <div className="border-b border-gray-200 p-3">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">{homework.title}</div>
            <QrCode className="text-blue-800" />
          </div>
          <div className="mt-3 flex items-center gap-1">
            <svg
              _ngcontent-ng-c931010807=""
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide mr-2 h-4 w-4 text-gray-800"
            >
              <path _ngcontent-ng-c931010807="" d="M6 20h4"></path>
              <path _ngcontent-ng-c931010807="" d="M14 10h4"></path>
              <path _ngcontent-ng-c931010807="" d="M6 14h2v6"></path>
              <path _ngcontent-ng-c931010807="" d="M14 4h2v6"></path>
              <rect _ngcontent-ng-c931010807="" x="6" y="4" width="4" height="6"></rect>
              <rect _ngcontent-ng-c931010807="" x="14" y="14" width="4" height="6"></rect>
            </svg>
            <span className="text-sm">
              Mã bài tập: <span className="font-semibold">{hashId}</span>
            </span>
          </div>
        </div>

        <div className="px-2 pb-2 pt-3">
          <div className="flex flex-col items-center justify-center rounded-md p-2 shadow-sm">
            <div className="text-lg font-semibold">{`${homework?.classroom?.classgroup?.classgroupName || ""} / ${homework?.classroom?.className || ""}`}</div>

            <div className="mt-2 text-sm font-semibold">Vui lòng chọn đúng tên mình để báo danh với Giáo viên</div>

            <div className="relative mt-3 w-6/12 shadow-sm">
              <input
                type="text"
                className="w-full rounded-md border border-slate-300 px-2 py-2 text-sm"
                placeholder="Tìm kiếm theo tên học sinh"
              />
              <Search className="absolute right-3 top-2.5 size-4 text-slate-600" />
            </div>

            <div className="mt-4 grid w-full grid-cols-12 gap-4">
              {students?.map((studentClass, key) => <StudentCard studentClass={studentClass} key={studentClass.id} />)}
            </div>

            <div className="mt-4 text-sm">Không có trong danh sách trên, vui lòng liên hệ với Giáo viên của bạn!</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdentifyStudent;
