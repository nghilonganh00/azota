interface Student {
  id: string;
  userId: number;
  studentName: string;
  studentGender: boolean;
  studentPhone: string;
  studentEmail: string;
  totalHomeworkAnswer: number;
  identificationNumber: number;
  studentDOB: string;
}

interface NewStudent {
  studentName: string;
  identificationNumber: string;
  studentGender: string;
  studentDOB: string;
  studentPhone: string;
  studentEmail: string;
  classId: string;
}

interface Homework {
  id: number;
  hashId: string;
  createdAt: string;
  totalSubmit: number;
  Homework: {
    id: number;
    homeworkName: string;
  };
}

interface GroupedHomework {
  [key: string]: Homework[];
}

export type { Student, NewStudent, Homework, GroupedHomework };
