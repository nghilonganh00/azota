import { useEffect, useState } from "react";
import Dropdown from "../../../../../Globals/Components/Dropdown/dropdown";
import { Tab } from "../../../../../Globals/Interfaces/interface";
import { ConfigDropdownProps } from "../libs/interface";
import SubjectAPI from "../../../../../API/subjectAPI";

const SubjectDropdown: React.FC<ConfigDropdownProps> = (props) => {
  const { selectedValue, setSelectValue } = props;
  const [subjects, setSubjects] = useState<Tab[]>([]);

  useEffect(() => {
    const fetchSubject = async () => {
      const data = await SubjectAPI.getAll();

      const subjectTabs: Tab[] = data?.map((subject: any) => ({
        name: subject.subjectName,
        value: subject.id,
      }));

      setSubjects(subjectTabs);
      setSelectValue(subjectTabs[0]);
    };

    fetchSubject();
  }, []);

  console.log(subjects);

  return (
    <div className="col-span-6">
      <span className="mb-2 flex text-sm font-medium">Môn học</span>
      <Dropdown
        options={subjects}
        selectedValue={selectedValue}
        setSelectedValue={setSelectValue}
      />
    </div>
  );
};

export default SubjectDropdown;
