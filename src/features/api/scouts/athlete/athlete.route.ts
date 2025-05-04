import express from "express";
const router = express.Router();
import AthleteController from "./athlete.controller";
import AthleteService from "./athlete.service";
import { AthleteValidation } from "./athlete.validation";
import UserModel from "../../../../shared/services/database/athletes/auth/index";
import { isScoutAuthenticated } from "../../../../shared/services/middleware/user.middleware";



const userModel = new UserModel()
const athleteService = new AthleteService({ userModel })
const athleteController = new AthleteController({athleteService})

router.get("/athletes", isScoutAuthenticated,  AthleteValidation.limit, AthleteValidation.validateFormData, athleteController.getAllAthlete);
router.get("/athlete/:athleteId", isScoutAuthenticated, athleteController.getSingleAthlete);
router.get("/search", isScoutAuthenticated, athleteController.search);


export default router;