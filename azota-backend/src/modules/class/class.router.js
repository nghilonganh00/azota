import express from "express";
import AuthMiddleware from "../auth/auth.middleware";

import classController from "./class.controller";

let router = express.Router();

router.get(
  "/",
  AuthMiddleware.isAuth,
  AuthMiddleware.isTeacher,
  classController.handleGetAll
);
router.post(
  "/",
  AuthMiddleware.isAuth,
  AuthMiddleware.isTeacher,
  classController.handelCreate
);

export default router;
