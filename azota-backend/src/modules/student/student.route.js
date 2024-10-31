import express from "express";

import AuthMiddleware from "../auth/auth.middleware";
import classroomMiddleware from "../classroom/classroom.middleware";

import studentController from "./student.controller";

let router = express.Router();

router.get("/confirm/:studentId", studentController.handleConfirm);
router.get("/exam-result", studentController.handleGetExamResults);
router.get("/", studentController.handleGetAll);
router.get(
  "/class/:classId/exam/:examId/assigments",
  AuthMiddleware.isAuth,
  studentController.getExamAssignments
);
router.post(
  "/",
  AuthMiddleware.isAuth,
  AuthMiddleware.isTeacher,
  classroomMiddleware.isOwer,
  studentController.handleCreate
);

export default router;
