import express from "express";
const router = express.Router();
import AthleteController from "./athlete.controller";
import AthleteService from "./athlete.service";
import { AdminAthleteValidation } from "./athlete.validation";
import UserModel from "../../../../shared/services/database/athletes/auth/index";
import { isAdminAuthenticated } from "../../../../shared/services/middleware/admin.middleware";



const userModel = new UserModel()
const athleteService = new AthleteService({ userModel })
const athleteController = new AthleteController({athleteService})

router.get("/athletes", isAdminAuthenticated,  AdminAthleteValidation.pagination, AdminAthleteValidation.validateFormData, athleteController.getAllAthlete);
router.get("/athletes-by-status", isAdminAuthenticated,  AdminAthleteValidation.status, AdminAthleteValidation.validateFormData, athleteController.getAllAthleteByStatus);
router.get("/athlete/:athleteId", isAdminAuthenticated, athleteController.getSingleAthlete);
router.get("/athletes/search", isAdminAuthenticated, athleteController.search);

router.get("/athletes-total", isAdminAuthenticated, athleteController.totalAthletes);
router.get("/athlete-last-month-percentage", isAdminAuthenticated, athleteController.lastMonthPercentReg);
router.get("/athlete-reg-per-month", isAdminAuthenticated, athleteController.totalRegPerMonth);

router.post("/athlete-change-status", isAdminAuthenticated,  AdminAthleteValidation.changeStatus, AdminAthleteValidation.validateFormData, athleteController.changeStatus);




export default router;