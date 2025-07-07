import { useEffect, useState } from "react";
import Dropdown from "../../../../../Globals/Components/Dropdown/dropdown";
import { Tab } from "../../../../../Globals/Interfaces/interface";
import GradeAPI from "../../../../../API/gradeAPI";
import PurposeAPI from "../../../../../API/purposeAPI";
import SubjectAPI from "../../../../../API/subjectAPI";
import { Grade, Purpose, Subject } from "../../../../../Globals/Interfaces/info.interface";

interface CategoryFromProps {
  gradeId: number;
  subjectId: number;
  purposeId: number;
  handleChangeConfig: (name: string, newValue: any) => void;
}

export const CategoryForm: React.FC<CategoryFromProps> = (props) => {
  const { gradeId, subjectId, purposeId, handleChangeConfig } = props;

  const [selectedGrade, setSelectedGrade] = useState<Tab | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<Tab | null>(null);
  const [selectedPurpose, setSelectedPurpose] = useState<Tab | null>(null);
  const [grades, setGrades] = useState<Tab[] | null>(null);
  const [subjects, setSubjects] = useState<Tab[] | null>(null);
  const [purposes, setPurposes] = useState<Tab[] | null>(null);

  useEffect(() => {
    const fetchGradePurposeData = async () => {
      const [gradeRes, purposeRes] = await Promise.all([GradeAPI.getAll(), PurposeAPI.getAll()]);
      const [subjectRes] = await Promise.all([SubjectAPI.getByGradeId(gradeId)]);

      if (gradeRes?.status === 200) {
        const gradesData: Tab[] = gradeRes.data.map((grade: Grade) => ({ name: grade.name, value: grade.id }));
        setGrades(gradesData);

        const preSelectdGrade = gradesData.find((grade) => grade.value === gradeId) || null;
        setSelectedGrade(preSelectdGrade);
      }

      if (subjectRes?.status === 200) {
        const subjectsData: Tab[] = subjectRes.data.map((subject: Subject) => ({
          name: subject.subjectName,
          value: subject.id,
        }));
        setSubjects(subjectsData);

        const preSelectdSubject = subjectsData.find((subject) => subject.value === subjectId) || null;
        setSelectedSubject(preSelectdSubject);
      }

      if (purposeRes?.status === 200) {
        const purposesData: Tab[] = purposeRes.data.map((purpose: Purpose) => ({
          name: purpose.title,
          value: purpose.id,
        }));
        setPurposes(purposesData);

        const preSelectdPurpose = purposesData.find((purpose) => purpose.value === purposeId) || null;
        setSelectedPurpose(preSelectdPurpose);
      }
    };

    fetchGradePurposeData();
  }, []);

  useEffect(() => {
    const fetchSubjectData = async () => {
      if (!selectedGrade?.value) return;

      const response = await SubjectAPI.getByGradeId(selectedGrade.value);
      if (response?.status === 200) {
        const subjectsData: Tab[] = response.data.map((subject: Subject) => ({
          name: subject.subjectName,
          value: subject.id,
        }));
        setSubjects(subjectsData);

        gradeId !== selectedGrade.value && handleChangeConfig("subjectId", null);

        const preSelectdSubject = subjectsData.find((subject) => subject.value === subjectId) || null;
        setSelectedSubject(preSelectdSubject);
      }
    };

    fetchSubjectData();
  }, [selectedGrade]);

  useEffect(() => {
    selectedGrade && handleChangeConfig("gradeId", selectedGrade.value || null);
    selectedSubject && handleChangeConfig("subjectId", selectedSubject.value || null);
    selectedPurpose && handleChangeConfig("purposeId", selectedPurpose.value || null);
  }, [selectedGrade, selectedSubject, selectedPurpose]);

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-6">
        <span className="mb-2 flex text-sm font-medium">Khối học</span>

        <Dropdown
          options={grades}
          selectedValue={selectedGrade}
          setSelectedValue={setSelectedGrade}
          title="--Chọn khối--"
        />
      </div>

      <div className="col-span-6">
        <span className="mb-2 flex text-sm font-medium">Môn học</span>

        <Dropdown
          options={subjects}
          selectedValue={selectedSubject}
          setSelectedValue={setSelectedSubject}
          title="--Chọn môn--"
        />
      </div>

      <div className="col-span-12">
        <span className="mb-2 text-sm font-medium">Mục đích tạo đề</span>

        <Dropdown
          options={purposes}
          selectedValue={selectedPurpose}
          setSelectedValue={setSelectedPurpose}
          title="--Chọn mục đich--"
        />
      </div>
    </div>
  );
};
