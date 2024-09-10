import express from "express";
import purposeController from "./purpose.controller";

let router = express.Router();

router.get("/", purposeController.handleGetAll);

export default router;
