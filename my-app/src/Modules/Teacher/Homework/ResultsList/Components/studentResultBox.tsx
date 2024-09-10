import { Avatar } from "antd";
import { Student } from "../Interface/interface";
import StudentAvatar from "./avatar";
import ResultStatus from "./resultStatus";

interface StudentResultBoxProps {
  data: Student;
}

const StudentResultBox: React.FC<StudentResultBoxProps> = (props) => {
  const { data } = props;
  const {
    id,
    studentName,
    studentGender,
    studentPhone,
    studentEmail,
    HomeworkResults,
  } = data;

  console.log("student result: ", data);

  return (
    <div className="col-span-4 rounded-md bg-slate-100 px-4 py-5 shadow-sm duration-200 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-lg">
      <div className="flex items-center justify-start gap-2">
        <StudentAvatar fullname={studentName} />
        <div className="space-y-1 flex-1">
          <div className="text-sm font-semibold">{studentName}</div>
          <ResultStatus answerHistory={HomeworkResults} />
        </div>
      </div>
    </div>
  );
};

export default StudentResultBox;
