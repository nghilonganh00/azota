import { ExamAssignType, Gender, QuestionType } from "../Constant/constant";
import { UserRole } from "./userInterface";

export type Tab = {
  name: string;
  value: any;
};

export interface APIErrorReponse {
  error: string;
  message: string;
  detail?: string;
}
