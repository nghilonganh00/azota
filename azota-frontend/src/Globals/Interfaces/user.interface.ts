import { Gender, UserRole } from "../Constant/constant";

export interface User {
  id: number;
  fullname: string;
  email: string;
  DOB: string;
  phone: string;
  avatarURL: string;
  role: UserRole;
  gender: Gender;
}

export interface Teacher {
  id: number;
  user: User;
}

export interface Student {
  id: number;
  fullname: string;
  gender: Gender;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
  confirmedAt: string;
  user: User;
}
