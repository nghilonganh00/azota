import { Class } from "../../../../../Globals/Interfaces/interface";
import StudentResultBox from "../Components/studentResultBox";
import { Student } from "../Interface/interface";

interface ListResultAreaProps {
  classroom: Class;
  students: Student[];
}

const ListResultArea: React.FC<ListResultAreaProps> = (props) => {
  const { classroom, students } = props;

  return (
    <div>
      <div className="py-4 text-sm">
        Danh sách nộp bài lớp: {classroom.className} (0/1)
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
