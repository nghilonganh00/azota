import { Classroom } from "../../../../../Globals/Interfaces/info.interface";
import StudentResultBox from "../Components/studentResultBox";
import { StudentClassWithSubmissions } from "../Interface/interface";

interface ListResultAreaProps {
  classroom: Classroom;
  students: StudentClassWithSubmissions[];
}

const ListResultArea: React.FC<ListResultAreaProps> = (props) => {
  const { classroom, students } = props;

  const submittedStudentTotal = students?.filter((student) => student.homeworkSubmissions.length > 0).length;

  return (
    <div>
      <div className="py-4 text-sm">
        {`Danh sách nộp bài lớp: ${classroom.className} (${submittedStudentTotal}/${students.length})`}
      </div>

      <div className="rounded-md border-gray-300 bg-white p-3 pb-28 shadow-sm">
        <div className="grid grid-cols-12 gap-4">
          {students.map((student, key) => (
            <StudentResultBox data={student} key={key} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListResultArea;
