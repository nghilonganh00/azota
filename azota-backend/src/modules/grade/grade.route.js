import express from "express";
import gradeController from "./grade.controller";

let router = express.Router();

router.get("/", gradeController.handleGetAll);

export default router;
