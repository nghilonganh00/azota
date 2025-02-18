export interface Student {
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

export interface NewStudent {
  studentName: string;
  identificationNumber: string;
  studentGender: string;
  studentDOB: string;
  studentPhone: string;
  studentEmail: string;
  classId: string;
}

export interface Homework {
  id: number;
  hashId: string;
  createdAt: string;
  totalSubmit: number;
  Homework: {
    id: number;
    homeworkName: string;
  };
}

export interface GroupedHomework {
  [key: string]: Homework[];
}

export interface NewStudentClass {
  fullname: string;
  email: string;
  phone: string;
  gender: string;
  DOB: string;
  identificationNumber: string;
  classroomId: number;
}
