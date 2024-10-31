import express from "express";

import AuthMiddleware from "../auth/auth.middleware";
import ExamByStudentController from "./examByStudent.controller";

let router = express.Router();

// router.get(
//   "exam/:examId/studentids",
//   AuthMiddleware.isAuth,
//   ExamByStudentController.getAssignedExamStudentIds
// );

export default router;
