import { Tab } from "../../../../../Globals/Interfaces/interface";

export interface CreateExam {
  examName: string;
  gradeId: string;
  subjectId: string;
  purposeId: string;
  examDescribe: string;
  examContent: object;
}

export interface ConfigDropdownProps {
  selectedGradeId?: string | null;
  selectedValue: Tab | null;
  setSelectValue: React.Dispatch<React.SetStateAction<Tab | null>>;
}
