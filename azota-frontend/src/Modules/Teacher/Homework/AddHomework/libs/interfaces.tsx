import { Classroom } from "../../../../../Globals/Interfaces/info.interface";

interface NewHomework {
  title: string;
  content: string;
  startDate: string;
  endDate: string;
  isShowResult: boolean;
  isMustLogin: boolean;
  isInTrash: boolean;
  classroomIds: number[];
  homeworkFiles: File[];
}

interface ClassGroup {
  id: number;
  classgroupName: string;
  teacherId: number;
  classrooms: Classroom[];
}

export type { NewHomework, ClassGroup };
