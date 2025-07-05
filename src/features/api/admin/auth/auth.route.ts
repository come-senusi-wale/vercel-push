import express from "express";
const router = express.Router();
import AuthorizationRepo from "../../../../shared/services/encryption/index";
import AdminModel from "../../../../shared/services/database/admin/auth/index";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";
import { AdminAuthValidation } from "./auth.validation";
import { isSuperAdminAuthenticated, isAdminAuthenticated } from "../../../../shared/services/middleware/admin.middleware";


const adminModel = new AdminModel()
const encryption = new AuthorizationRepo()
const authService = new AuthService({adminModel, encryption} )
const authController = new AuthController({authService})

router.post("/signup", AdminAuthValidation.registerParams, AdminAuthValidation.validateFormData, authController.create);

router.post("/register", isSuperAdminAuthenticated, AdminAuthValidation.registerParams, AdminAuthValidation.validateFormData, authController.register);
router.post("/resend-email", AdminAuthValidation.resendEmailParams, AdminAuthValidation.validateFormData, authController.resendEmail);
router.post("/verify-email", AdminAuthValidation.verifyEmailParams, AdminAuthValidation.validateFormData, authController.verifyEmail);
router.post("/login", AdminAuthValidation.loginParams, AdminAuthValidation.validateFormData, authController.login);
router.post("/forgot-password", AdminAuthValidation.forgotPasswordParams, AdminAuthValidation.validateFormData, authController.forgotPassword);
router.post("/verify-password-otp", AdminAuthValidation.verifyPasswordOtpParams, AdminAuthValidation.validateFormData, authController.verifyPasswordOtp);
router.post("/reset-password", AdminAuthValidation.resetPasswordParams, AdminAuthValidation.validateFormData, authController.resetPassword);

router.get("/admins", isAdminAuthenticated, AdminAuthValidation.pagination, AdminAuthValidation.validateFormData, authController.getAllAdmin);
router.post("/change-status", isSuperAdminAuthenticated, AdminAuthValidation.changeStatusParams, AdminAuthValidation.validateFormData, authController.changeAdminStatus);
router.post("/change-role", isSuperAdminAuthenticated, AdminAuthValidation.changeRoleParams, AdminAuthValidation.validateFormData, authController.changeAdminRole);

export default router;