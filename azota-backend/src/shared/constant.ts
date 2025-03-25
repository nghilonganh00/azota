export enum UserRole {
  ADMIN = "ADMIN",
  TEACHER = "TEACHER",
  STUDENT = "STUDENT",
}

export enum Gender {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
}

export enum ExamAssignType {
  ALL = "ALL",
  CLASS = "CLASS",
  STUDENT = "STUDENT",
}

export enum ExamType {
  TEST = "TEST",
  PRACTICE = "PRACTICE",
}

export enum ShowResult {
  NO = "NO",
  SUBMITTED = "SUBMITTED",
  ALL_SUBMITTED = "ALL_SUBMITTED",
}

export enum ShowAnswer {
  NO = "NO",
  SUBMITTED = "SUBMITTED",
  ALL_SUBMITTED = "ALL_SUBMITTED",
  REACHED_POINT = "REACHED_POINT",
}

export enum FeeType {
  FREE = "FREE",
  TEST = "TEST",
  EXPLAIN = "EXPLAIN",
}

export enum QuestionType {
  MULTIQUE_CHOICE = "MULTIQLE_CHOICE",
  ESSAY = "ESSAY",
}

// Notification Type
export enum NotificationType {
  Homework = "HOMEWORK",
  Exam = "EXAM",
}

export enum ExamNotification {
  NEW_EXAM = "NEW_EXAM",
  SUBMIT_EXAM = "SUBMIT_EXAM",
  MARK_EXAM = "MARK_EXAM",
}

export enum HomeworkNotification {
  NEW_HOMEWORK = "NEW_HOMEWORK",
  SUBMIT_HOMEWORK = "SUBMIT_HOMEWORK",
  MARK_HOMEWORK = "MARK_HOMEWORK",
}
