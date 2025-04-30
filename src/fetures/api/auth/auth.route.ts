import express from "express";
const router = express.Router();
import Encryption from "../../../shared/services/encryption/index";
import AuthModel from "../../../shared/services/database/athletes/auth/index";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";
import { AuthValidation } from "./auth.validation";


const authModel = new AuthModel()
const encryption = new Encryption()
const authService = new AuthService({authModel, encryption} )
const authController = new AuthController({authService})

router.post("/signup", AuthValidation.registerParams, AuthValidation.validateFormData, authController.register);
router.post("/resend-email", AuthValidation.resendEmailParams, AuthValidation.validateFormData, authController.resendEmail);
router.post("/verify-email", AuthValidation.verifyEmailParams, AuthValidation.validateFormData, authController.verifyEmail);
router.post("/login", AuthValidation.loginParams, AuthValidation.validateFormData, authController.login);
router.post("/forgot-password", AuthValidation.forgotPasswordParams, AuthValidation.validateFormData, authController.forgotPassword);
router.post("/reset-password", AuthValidation.resetPasswordParams, AuthValidation.validateFormData, authController.resetPassword);

export default router;