import express from "express";
import subjectController from "./subject.controller";

let router = express.Router();

router.get("/", subjectController.handleGetAll);

export default router;
