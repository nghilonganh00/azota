import StudentAvatar from "./avatar";
import ResultStatus from "./resultStatus";
import { StudentClassWithSubmissions } from "../Interface/interface";
import { Link, useNavigate, useParams } from "react-router-dom";

interface StudentResultBoxProps {
  data: StudentClassWithSubmissions;
}

const StudentResultBox: React.FC<StudentResultBoxProps> = (props) => {
  const navigate = useNavigate();

  const { data } = props;
  const { id, fullname, gender, phone, email, homeworkSubmissions } = data;

  const handleClickBox = () => {
    if (homeworkSubmissions.length > 0 && homeworkSubmissions[0]?.id) {
      navigate(`/teacher/homework/mark-homework/homework-submission/${homeworkSubmissions[0].id}`);
    }
  };

  return (
    <div
      className="col-span-4 rounded-md bg-slate-100 px-4 py-5 shadow-sm duration-200 ease-in-out hover:scale-105 hover:cursor-pointer hover:shadow-lg"
      onClick={handleClickBox}
    >
      <div className="flex items-center justify-start gap-2">
        <StudentAvatar fullname={fullname} />
        <div className="flex-1 space-y-1">
          <div className="text-sm font-medium">{fullname}</div>
          <ResultStatus answerHistory={homeworkSubmissions} />
        </div>
      </div>
    </div>
  );
};

export default StudentResultBox;
