import { HomeworkSubmission } from "../../../../../Globals/Interfaces/homework.interface";
import { StudentClass } from "../../../../../Globals/Interfaces/info.interface";

export interface StudentClassWithSubmissions extends StudentClass {
  homeworkSubmissions: HomeworkSubmission[];
}
