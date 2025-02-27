import { Classgroup } from "../../../../../Globals/Interfaces/info.interface";

interface ClassGroupBoxProps {
  classgroup: Classgroup;
  assignedClassIds: number[];
  onChange: (assignClass: number) => void;
}

const ClassGroupBox: React.FC<ClassGroupBoxProps> = (props) => {
  const { classgroup, assignedClassIds, onChange } = props;
  const { id, classgroupName, teacherId, classrooms } = classgroup;

  console.log("assigned class ids: ", assignedClassIds);

  return (
    <div className="p-2">
      <div className="text-sm">
        <span className="font-bold text-gray-700 dark:text-slate-300">{classgroupName}</span>
        <span>{` (0/2 lớp)`} </span>
        <span className="text-blue-500">Chọn tất cả lớp</span>
      </div>

      <div className="mt-4 grid grid-cols-12">
        {classrooms.map((classroom, key) => (
          <div className="col-span-4 flex items-center gap-2" key={classroom.id}>
            <input
              type="checkbox"
              className="size-4 accent-blue-800"
              defaultChecked={assignedClassIds?.includes(classroom.id)}
              onChange={() => onChange(classroom.id)}
            />
            <div className="text-sm">{classroom.className}(0)</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassGroupBox;
