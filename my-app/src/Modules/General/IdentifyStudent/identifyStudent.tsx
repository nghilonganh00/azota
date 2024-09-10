import { useEffect, useState } from "react";
import { CircleCheckBig, QrCode, Search } from "lucide-react";
import StudentAvatar from "../../Teacher/Homework/ResultsList/Components/avatar";
import FrontHomeworkAPI from "../../../API/frontHomeworkAPI";
import { useParams } from "react-router";
import { Student } from "../../Teacher/Homework/ResultsList/Interface/interface";
import StudentCard from "./Components/studentCard";
import Popup from "../../../Globals/Components/popup";

interface Homework {
  id: number;
  homeworkName: string;
  homeworkContent: string;
  homeworkStartDate: string;
  homeworkEndDate: string;
  homeworkShowResult: string;
  homeworkMustLogin: string;
  teacherId: string;
  createdAt: string;
}

interface Classroom {
  id: number;
  className: string;
  classYear: string;
  teacherId: string;
  classGroupId: string;
  createdAt: string;
  updatedAt: string;
  ClassGroup: {
    id: number;
    classGroupName: string;
  };
}

const IdentifyStudent = () => {
  const { hashId } = useParams();
  const [homework, setHomework] = useState<Homework>({} as Homework);
  const [classroom, setClassroom] = useState<Classroom>({} as Classroom);
  const [students, setStudents] = useState<Student[]>([]);
 

  useEffect(() => {
    const fetchData = async () => {
      if (hashId) {
        const data = await FrontHomeworkAPI.getByHashId(hashId);
        setHomework(data.homeworkObj);
        setClassroom(data.classObj);
        setStudents(data.studentsObj);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <div className="rounded-md bg-white shadow-sm">
        <div className="border-b border-gray-200 p-3">
          <div className="flex items-center justify-between">
            <div className="text-lg font-semibold">{homework.homeworkName}</div>
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
              <rect
                _ngcontent-ng-c931010807=""
                x="6"
                y="4"
                width="4"
                height="6"
              ></rect>
              <rect
                _ngcontent-ng-c931010807=""
                x="14"
                y="14"
                width="4"
                height="6"
              ></rect>
            </svg>
            <span className="text-sm">
              Mã bài tập: <span className="font-semibold">{hashId}</span>
            </span>
          </div>
        </div>

        <div className="px-2 pb-2 pt-3">
          <div className="flex flex-col items-center justify-center rounded-md p-2 shadow-sm">
            {classroom && classroom.ClassGroup && (
              <div className="text-lg font-semibold">{`${classroom.ClassGroup.classGroupName} / ${classroom.className}`}</div>
            )}

            <div className="mt-2 text-sm font-semibold">
              Vui lòng chọn đúng tên mình để báo danh với Giáo viên
            </div>

            <div className="relative mt-3 w-6/12 shadow-sm">
              <input
                type="text"
                className="w-full rounded-md border border-slate-300 px-2 py-2 text-sm"
                placeholder="Tìm kiếm theo tên học sinh"
              />
              <Search className="absolute right-3 top-2.5 size-4 text-slate-600" />
            </div>

            <div className="mt-4 grid w-full grid-cols-12 gap-4">
              {students?.map((student, key) => (
                <StudentCard student={student} />
              ))}
            </div>

            <div className="mt-4 text-sm">
              Không có trong danh sách trên, vui lòng liên hệ với Giáo viên của
              bạn!
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
};

export default IdentifyStudent;
