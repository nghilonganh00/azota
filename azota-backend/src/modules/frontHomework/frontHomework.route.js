import express from "express";
import FrontHomeworkController from "./frontHomework.controller";

let router = express.Router();

router.get("/", FrontHomeworkController.handleGetByHashId);

export default router;
