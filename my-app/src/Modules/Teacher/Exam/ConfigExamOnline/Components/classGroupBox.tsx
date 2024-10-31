import { ClassGroup } from "../../../Homework/AddHomework/libs/interfaces";

interface ClassGroupBoxProps {
  classGroup: ClassGroup;
  assignedClassIds: number[];
  onChange: (assignClass: number) => void;
}

const ClassGroupBox: React.FC<ClassGroupBoxProps> = (props) => {
  const { classGroup, assignedClassIds, onChange } = props;
  const { id, classGroupName, teacherId, Classes } = classGroup;

  console.log("assigned class ids: ", assignedClassIds);

  return (
    <div className="p-2">
      <div className="text-sm">
        <span className="font-bold text-gray-700">{classGroupName}</span>
        <span>(0/2 lớp) </span>
        <span className="font-medium text-blue-500">Chọn tất cả lớp</span>
      </div>

      <div className="mt-4 grid grid-cols-12">
        {Classes.map((classroom, key) => (
          <div className="col-span-4 flex items-center gap-2" key={key}>
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
