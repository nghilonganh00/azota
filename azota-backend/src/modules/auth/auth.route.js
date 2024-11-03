import express from "express";
import AuthController from "./auth.controller";
import AuthMiddleware from "./auth.middleware";

let router = express.Router();

router.post("/register", AuthController.handleRegister);
router.post("/login", AuthController.handleLoginByPassword);
router.get("/login-by-google", AuthController.handleLoginByGoogle);
router.post("/generate-login-qr", AuthController.generateLoginQR);
router.post(
  "/approve-login-qr",
  AuthMiddleware.isAuth,
  AuthController.approveQrLogin
);
router.post(
  "/check-qr-login-approval",
  AuthController.checkLoginQrCodeApproval
);

export default router;
