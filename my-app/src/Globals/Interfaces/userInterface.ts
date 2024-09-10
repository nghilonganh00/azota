export type UserRole = "TEACHER" | "STUDENT";

export interface User {
  userFullName: string;
  userRole: UserRole;
}
