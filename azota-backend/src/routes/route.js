import express from "express";

import AuthRouter from "../modules/auth/auth.route";
import UserRouter from "../modules/user/user.route";
import GradeRouter from "../modules/grade/grade.route";
import SubjectRouter from "../modules/subject/subject.route";
import PurposeRouter from "../modules/purpose/purpose.route";

import ClassRouter from "../modules/class/class.router";
import ClassGroupRouter from "../modules/classgroup/classgroup.router";
import StudentRouter from "../modules/student/student.route";
import HomeworkRouter from "../modules/homework/homework.route";
import HomeworkFileRouter from "../modules/homeworkfile/homeworkfile.route";
import ExamRouter from "../modules/exam/exam.route";
import ExamResultRouter from "../modules/examResult/examResult.route";
import OptionRouter from "../modules/option/option.route";

import FrontHomeworkRouter from "../modules/frontHomework/frontHomework.route";
import StudentProfileRouter from "../modules/studentProfile/studentProfile.route";

let router = express.Router();

let initWebRoutes = (app) => {
  router.use("/api/auth", AuthRouter);
  router.use("/api/user", UserRouter);
  router.use("/api/grade", GradeRouter);
  router.use("/api/subject", SubjectRouter);
  router.use("/api/purpose", PurposeRouter);
  router.use("/api/class", ClassRouter);
  router.use("/api/classgroup", ClassGroupRouter);
  router.use("/api/student", StudentRouter);
  router.use("/api/homework", HomeworkRouter);
  router.use("/api/homework-file", HomeworkFileRouter);
  router.use("/api/exam", ExamRouter);
  router.use("/api/exam-result", ExamResultRouter);
  router.use("/api/option", OptionRouter);

  router.use("/api/front-homework", FrontHomeworkRouter);
  router.use("/api/student-profile", StudentProfileRouter);

  return app.use("/", router);
};

module.exports = initWebRoutes;
