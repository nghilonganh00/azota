import { useEffect, useState } from "react";
import Dropdown from "../../../../../Globals/Components/Dropdown/dropdown";
import { Tab } from "../../../../../Globals/Interfaces/interface";
import { ConfigDropdownProps } from "../libs/interface";
import SubjectAPI from "../../../../../API/subjectAPI";
import { AxiosResponse } from "axios";

const SubjectDropdown: React.FC<ConfigDropdownProps> = (props) => {
  const { selectedGradeId, selectedValue, setSelectValue } = props;
  const [subjects, setSubjects] = useState<Tab[]>([]);

  useEffect(() => {
    const fetchSubject = async () => {
      if (!selectedGradeId) return;

      const response: AxiosResponse | null = await SubjectAPI.getByGradeId(selectedGradeId);

      const subjectTabs: Tab[] = response?.data.map((subject: any) => ({
        name: subject.subjectName,
        value: subject.id,
      }));

      setSubjects(subjectTabs);
    };

    fetchSubject();
  }, [selectedGradeId]);

  return (
    <div className="col-span-6">
      <span className="mb-2 flex text-sm font-medium">Môn học</span>
      <Dropdown
        title="---Chọn môn học---"
        options={subjects}
        selectedValue={selectedValue}
        setSelectedValue={setSelectValue}
      />
    </div>
  );
};

export default SubjectDropdown;
