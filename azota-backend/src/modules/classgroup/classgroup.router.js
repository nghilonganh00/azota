import express from "express";
import classgroupController from "./classgroup.controller";
import AuthMiddleware from "../auth/auth.middleware";

let router = express.Router();

router.get(
  "/",
  AuthMiddleware.isAuth,
  AuthMiddleware.isTeacher,
  classgroupController.handleGetAll
);

router.get(
  "/class/student",
  AuthMiddleware.isAuth,
  AuthMiddleware.isTeacher,
  classgroupController.handleGetAll
);

router.post(
  "/",
  AuthMiddleware.isAuth,
  AuthMiddleware.isTeacher,
  classgroupController.handleCreate
);

export default router;
