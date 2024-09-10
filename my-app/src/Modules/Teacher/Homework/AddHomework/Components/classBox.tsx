import { Class } from "../../../../../Globals/Interfaces/interface";
import { NewHomework } from "../libs/interfaces";

interface ClassBoxProps {
  classroom: Class;
  values: NewHomework;
  onChange: (name: string, newValue: number[]) => void;
}
const ClassBox: React.FC<ClassBoxProps> = (props) => {
  const { classroom, values, onChange } = props;
  const { id, className } = classroom;

  const handleChangeCheckBox = (id: number) => {
    const classIds = values["classIds"];
    const newClassIds = classIds.includes(id)
      ? classIds.filter((classId) => classId !== id)
      : [...classIds, id];

    onChange("classIds", newClassIds);
  };

  return (
    <div className="col-span-4 flex items-center gap-2">
      <input
        type="checkbox"
        className="size-4"
        onChange={() => handleChangeCheckBox(id)}
      />
      <div className="text-sm">{`${className}`}</div>
    </div>
  );
};

export default ClassBox;
