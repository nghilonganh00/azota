import express from "express";
import homeworkFileController from "./homeworkfile.controller";

let router = express.Router();

router.post("", homeworkFileController.create);
router.delete("/:id", homeworkFileController.handleDelete)

export default router;
