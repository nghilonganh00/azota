import { Homework } from "../interface";

interface ConfigNameProps {
  values: Homework;
  onChange: (name: string, newValue: string) => void;
}
const ConfigName: React.FC<ConfigNameProps> = (props) => {
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
          id="new-hw-name"
          placeholder="Nhập tên ..."
          value={values["homeworkName"]}
          onChange={(e) => onChange("homeworkName", e.target.value)}
          className="w-full rounded-md border border-gray-200 px-3 py-2 text-sm shadow-sm"
        />
      </div>
    </div>
  );
};

export default ConfigName;
