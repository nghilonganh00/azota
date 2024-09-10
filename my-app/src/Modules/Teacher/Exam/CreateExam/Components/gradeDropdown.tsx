import { useEffect, useState } from "react";
import GradeAPI from "../../../../../API/gradeAPI";
import Dropdown from "../../../../../Globals/Components/Dropdown/dropdown";

type Tab = { name: string; value: string };

interface GradeDropdownProps {
  selectedGrade: Tab;
  setSelectedGrade: React.Dispatch<React.SetStateAction<Tab>>;
}

const GradeDropdown: React.FC<GradeDropdownProps> = (props) => {
  const { selectedGrade, setSelectedGrade } = props;
  const [grades, setGrades] = useState<Tab[]>([]);

  useEffect(() => {
    const fetchGrade = async () => {
      const data = await GradeAPI.getAll();

      const gradeTabs = data?.map((grade: any) => ({
        name: grade.gradeName,
        value: grade.id,
      }));

      setGrades(gradeTabs);
      setSelectedGrade(gradeTabs[0]);
    };

    fetchGrade();
  }, []);

  console.log(grades);

  return (
    <div className="col-span-6">
      <span className="mb-2 flex text-sm font-medium">Khối học</span>
      <Dropdown
        options={grades}
        selectedValue={selectedGrade}
        setSelectedValue={setSelectedGrade}
      />
    </div>
  );
};

export default GradeDropdown;
