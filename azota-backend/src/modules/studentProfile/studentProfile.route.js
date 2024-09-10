import express from "express";
import studentProfileController from "./studentProfile.controller";

let router = express.Router();

router.get("/:classId", studentProfileController.handleGet);

export default router;
