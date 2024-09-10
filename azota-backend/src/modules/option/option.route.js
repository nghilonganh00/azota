import express from "express";
import optionController from "./option.controller";

let router = express.Router();

router.get("/change-is-answer/:optionId", optionController.handleChangeIsAnswer);

export default router;
