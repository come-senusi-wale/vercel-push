import express from "express";
const router = express.Router();
import TrialController from "./trial.controller";
import TrialService from "./trial.service";
import { AthleteTrialValidation } from "./trial.validation";
import TrialModel from "../../../../shared/services/database/general/trial/index";
import NotificationModel from "../../../../shared/services/database/general/notification/index";
import { isAthleteAuthenticated } from "../../../../shared/services/middleware/user.middleware";
import TrialApplicationModel from "../../../../shared/services/database/athletes/trialApplication/index";
import { singleFileUpload } from "../../../../shared/services/middleware/fileUpload.middleware";



const trailModel = new TrialModel()
const trialApplicationModel = new TrialApplicationModel()
const notificationModel = new NotificationModel()
const trialService = new TrialService({ trailModel, trialApplicationModel, notificationModel })
const trialController = new TrialController({trialService})

router.get("/trials", isAthleteAuthenticated, AthleteTrialValidation.pagination, AthleteTrialValidation.validateFormData, trialController.allPaginatedTrial);
router.get("/trials/search", isAthleteAuthenticated, trialController.searchTrial);
router.post("/trials/apply", isAthleteAuthenticated, singleFileUpload('picture', ['image', 'video']), AthleteTrialValidation.applyTrial, AthleteTrialValidation.validateFormData, trialController.applyForTrial);
router.get("/trials/activity", isAthleteAuthenticated, AthleteTrialValidation.pagination, AthleteTrialValidation.validateFormData, trialController.getUrTrial);
router.get("/trials/activity/:trialId", isAthleteAuthenticated, trialController.getUrSingleTrial);
router.get("/trials/:trialId", isAthleteAuthenticated, trialController.singleTrial);



export default router;