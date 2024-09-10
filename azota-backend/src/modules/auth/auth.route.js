import express from "express";
import AuthController from "./auth.controller";

let router = express.Router();

router.post("/register", AuthController.handleRegister);
router.post("/login", AuthController.handleLoginByPassword);
router.get("/login-by-google", AuthController.handleLoginByGoogle);

export default router;
