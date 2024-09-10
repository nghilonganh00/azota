import express from "express";

import userController from "./user.controller";
import AuthMiddleware from "../auth/auth.middleware";
import UserMiddleware from "./user.middleware";

let router = express.Router();

router.get("/info", AuthMiddleware.isAuth, userController.handleGetInfo);

router.get(
  "/remove-teacher-role",
  AuthMiddleware.isAuth,
  userController.handleRemoveTeacherRole
);

router.get(
  "/register-teacher-role",
  AuthMiddleware.isAuth,
  userController.handleRegisterTeacherRole
);

router.get(
  "/:id",
  AuthMiddleware.isAuth,
  UserMiddleware.isOwner,
  userController.handleGetDetail
);

router.post("/anonymous", userController.handleCreateAnonymousUser);

export default router;
