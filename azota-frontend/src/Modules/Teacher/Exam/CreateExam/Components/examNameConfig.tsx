import { CreateExam } from "../libs/interface";

interface ExamNameConfigProps {
  values: CreateExam;
  onChange: (name: string, newValue: string) => void;
}

const ExamNameConfig: React.FC<ExamNameConfigProps> = (props) => {
  const { values, onChange } = props;

  return (
    <div className="grid grid-cols-12">
      <div className="col-span-12">
        <label htmlFor="new-hw-name" className="mb-2 flex text-sm font-medium">
          Tên
        </label>
      </div>
      <div className="col-span-12">
        <input
          type="text"
          id="new-exam-name"
          value={values["examName"]}
          onChange={(e) => onChange("examName", e.target.value)}
          placeholder="Nhập tên ..."
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm dark:border-none dark:bg-darkmode-800"
        />
      </div>
    </div>
  );
};

export default ExamNameConfig;
