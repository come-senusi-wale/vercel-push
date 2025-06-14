import express from "express";
const router = express.Router();
import ScoutController from "./scout.controller";
import ScoutService from "./scout.service";
import { AdminScoutValidation } from "./scout.validation";
import UserModel from "../../../../shared/services/database/athletes/auth/index";
import { isAdminAuthenticated } from "../../../../shared/services/middleware/admin.middleware";



const userModel = new UserModel()
const scoutService = new ScoutService({ userModel })
const scoutController = new ScoutController({scoutService})

router.get("/scouts", isAdminAuthenticated,  AdminScoutValidation.pagination, AdminScoutValidation.validateFormData, scoutController.getAllScout);
router.get("/scouts-by-status", isAdminAuthenticated,  AdminScoutValidation.status, AdminScoutValidation.validateFormData, scoutController.getAllScoutByStatus);
router.get("/scout/:athleteId", isAdminAuthenticated, scoutController.getSingleScout);
router.get("/scouts/search", isAdminAuthenticated, scoutController.search);




export default router;