import StudentResultCard from "./studentResultCard";
import { StudentResult } from "../libs/interface";

interface StudentResultListProps {
  studentResults: StudentResult[];
}

const StudentResultList: React.FC<StudentResultListProps> = (props) => {
  const { studentResults } = props;

  return (
    <div className="mt-6 grid grid-cols-12 gap-4">
      {studentResults?.map((studentResult) => (
        <StudentResultCard studentResult={studentResult} key={studentResult.id} />
      ))}
    </div>
  );
};

export default StudentResultList;
