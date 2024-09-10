import express from "express";

import AuthMiddleware from "../auth/auth.middleware";
import homeworkController from "./homework.controller";

let router = express.Router();

router.get("/", homeworkController.handleGetAll);
// router.get("/:homeworkId/config", homeworkController.handleGetConfigById);
router.get(
  "/classroom/:classId",
  AuthMiddleware.isAuth,
  AuthMiddleware.isTeacher,
  homeworkController.handleGetAllByClassId
);
router.get("/class", homeworkController.handleGetClassWithHomework);
router.get(
  "/:homeworkId/class/:classId/homework-result",
  homeworkController.handleGetStudentsHomework
);

router.get("/:homeworkId/config", homeworkController.handleGetConfig);
router.post("/:homeworkId/config", homeworkController.handleUpdateConfig);
router.post("/:homeworkId/content", homeworkController.handleUpdateContent);
router.post("/:homeworkId/file", homeworkController.handleUpdateContent);

router.post("/", homeworkController.handleCreate);
router.get("/:homeworkId/trash", homeworkController.handleTrash);

export default router;
