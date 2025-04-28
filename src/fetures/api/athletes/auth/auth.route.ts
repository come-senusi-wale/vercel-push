import express from "express";
const router = express.Router();
import AuthorizationRepo from "../../../../shared/services/encryption/index";
import AthletesModel from "../../../../shared/services/database/athletes/auth/index";
import AuthController from "./auth.controller";
import AuthService from "./auth.service";
import { AdminAuthValidation } from "./auth.validation";


const athletesModel = new AthletesModel()
const auth = new AuthorizationRepo()
const authService = new AuthService({athletesModel, auth} )
const authController = new AuthController({authService})

router.post("/signup", AdminAuthValidation.registerParams, AdminAuthValidation.validateFormData, authController.registerAdmin);

export default router;