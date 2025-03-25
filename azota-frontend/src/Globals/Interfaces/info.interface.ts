import { Gender } from "../Constant/constant";
import { HomeworkResult } from "./homework.interface";
import { Student } from "./user.interface";

export interface Grade {
  id: string;
  name: string;
}

export interface Purpose {
  id: string;
  title: string;
  position: number;
  semester: number;
}

export interface Subject {
  id: string;
  subjectName: string;
}

export interface Classgroup {
  id: number;
  classgroupName: string;
  teacherId: number;
  classrooms: Classroom[];
}

export interface Classroom {
  id: number;
  className: string;
  classYear: string;
  teacherId: string;
  studentCount: number;
  classgroupId: string;
  classgroup: Classgroup;
  studentClasses: StudentClass[];
  createdAt: string;
  updatedAt: string;
}

export interface StudentClass {
  id: number;
  fullname: string;
  email: string;
  phone: string;
  gender: Gender;
  DOB: Date;
  identificationNumber: string;
  confirmedAt: string;
  classroomId: number;
  student: Student;
  classroom: Classroom;
  homeworkResults: HomeworkResult[];
}

export interface Notification {
  _id: string;
  userId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  title: string;
  type: string;
  message: string;
  readAt: string;
  createdAt: string;
  extraData: Record<string, any>;
}
