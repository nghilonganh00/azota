import { ClassGroup } from "../../AddHomework/libs/interfaces";
import { Homework } from "../interface";

interface ClassGroupBoxProps {
  classGroup: ClassGroup;
  values: Homework;
  onChange: (name: string, newValues: number[]) => void;
}

const ClassGroupBox: React.FC<ClassGroupBoxProps> = (props) => {
  const { classGroup, values, onChange } = props;
  const { id, classgroupName, teacherId, classrooms } = classGroup;

  const handleChangeAssignClass = (id: number) => {
    values["classIds"]?.includes(id)
      ? onChange(
          "classIds",
          values["classIds"].filter((classId) => classId !== id),
        )
      : onChange("classIds", [...values["classIds"], id]);
  };

  return (
    <div className="p-2">
      <div className="text-sm">
        <span className="font-bold text-gray-700">{classgroupName}</span>
        <span>(0/2 lớp) </span>
        <span className="font-medium text-blue-500">Chọn tất cả lớp</span>
      </div>

      <div className="mt-4 grid grid-cols-12">
        {classrooms.map((classroom) => (
          <div className="col-span-4 flex items-center gap-2" key={classroom.id}>
            <input
              type="checkbox"
              className="size-4"
              checked={values["classIds"]?.includes(classroom.id)}
              onChange={() => handleChangeAssignClass(classroom.id)}
            />
            <div className="text-sm">{classroom.className}(0)</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClassGroupBox;
