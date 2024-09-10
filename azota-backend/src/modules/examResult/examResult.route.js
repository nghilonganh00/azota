import express from "express";

import AuthMiddleware from "../auth/auth.middleware";
import examResultController from "./examResult.controller";

let router = express.Router();

router.get(
  "/mark/:examResultId",
  AuthMiddleware.isAuth,
  examResultController.handleGetMark
);

router.get(
  "/review/:examResultId",
  AuthMiddleware.isAuth,
  AuthMiddleware.isTeacher,
  examResultController.handleGetReview
);
router.get(
  "/answer/:examResultId",
  AuthMiddleware.isAuth,
  examResultController.handleGetAnswer
);

router.post("/", AuthMiddleware.isAuth, examResultController.handleCreate);

export default router;
