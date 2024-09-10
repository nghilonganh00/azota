import express from "express";

import examController from "./exam.controller";
import AuthMiddleware from "../auth/auth.middleware";
import examMiddleware from "./exam.middleware";

let router = express.Router();

router.get(
  "/preview",
  AuthMiddleware.isAuth,
  AuthMiddleware.isTeacher,
  examController.handleGetAllPreviews
);
router.get("/config/:hashId", examController.handleConfigByHashId);
// router.get("/:hashId", examController.handleGetDetailByHashId);
router.get("/:hashId", examMiddleware.cache, examController.handleGetByHashId);

router.post(
  "/",
  AuthMiddleware.isAuth,
  AuthMiddleware.isTeacher,
  examController.handleCreate
);
router.put(
  "/config/:hashId",
  AuthMiddleware.isAuth,
  AuthMiddleware.isTeacher,
  examController.handleUpdateConfig
);

export default router;
