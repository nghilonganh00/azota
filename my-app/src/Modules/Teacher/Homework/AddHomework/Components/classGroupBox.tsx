import { ClassGroup, NewHomework } from "../libs/interfaces";
import ClassBox from "./classBox";

interface ClassGroupBoxProps {
  classgroup: ClassGroup;
  values: NewHomework;
  onChange: (name: string, newValue: number[]) => void;
}

const ClassGroupBox: React.FC<ClassGroupBoxProps> = (props) => {
  const { classgroup, values, onChange } = props;
  const { id, classGroupName, teacherId, Classes } = classgroup;

  return (
    <div className="p-2">
      <div className="text-sm">
        <span className="font-bold text-gray-700">{classGroupName}</span>{" "}
        <span>{`(0/${Classes.length}) lớp`}</span>
        <span className="ml-1 font-medium text-blue-500">Chọn tất cả lớp</span>
      </div>

      <div className="mt-4 grid grid-cols-12">
        {Classes.map((classroom, index) => (
          <ClassBox
            classroom={classroom}
            key={index}
            values={values}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
};

export default ClassGroupBox;
