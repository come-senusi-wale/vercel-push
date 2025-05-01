import express from "express";
const router = express.Router();
import TrialController from "./trial.controller";
import TrialService from "./trial.service";
import { AthleteTrialValidation } from "./trial.validation";
import TrialModel from "../../../../shared/services/database/general/trial/index";
import { isAthleteAuthenticated } from "../../../../shared/services/middleware/user.middleware";



const trailModel = new TrialModel()
const trialService = new TrialService({ trailModel })
const trialController = new TrialController({trialService})

router.get("/trials", isAthleteAuthenticated, AthleteTrialValidation.pagination, AthleteTrialValidation.validateFormData, trialController.allPaginatedTrial);
router.get("/trials/search", isAthleteAuthenticated, trialController.searchTrial);
router.get("/trials/:trialId", isAthleteAuthenticated, trialController.singleTrial);



export default router;