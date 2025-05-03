import express from "express";
const router = express.Router();
import AuthorizationRepo from "../../../../shared/services/encryption/index";
import AdminModel from "../../../../shared/services/database/admin/auth/index";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";
import { AdminAuthValidation } from "./auth.validation";


const adminModel = new AdminModel()
const auth = new AuthorizationRepo()
const authService = new AuthService({adminModel, auth} )
const authController = new AuthController({authService})

router.post("/signup", AdminAuthValidation.registerParams, AdminAuthValidation.validateFormData, authController.registerAdmin);

export default router;