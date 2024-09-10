import { Tab } from "../../../../../Globals/Interfaces/interface";

interface NewExam {
  examName: string;
  examAssignType: string;
  examSubmitCount: string;
  gradeId: string;
  subjectId: string;
  purposeId: string;
  examDescribe: string;
  examContent: object;
}

export interface ConfigDropdownProps {
  selectedValue: Tab;
  setSelectValue: React.Dispatch<React.SetStateAction<Tab>>;
}

export default NewExam;
