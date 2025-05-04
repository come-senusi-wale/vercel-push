import express from "express";
const router = express.Router();
import TrialController from "./trial.controller";
import TrialService from "./trial.service";
import { TrialValidation } from "./trial.validation";
import TrialModel from "../../../../shared/services/database/general/trial/index";
import { singleFileUpload } from "../../../../shared/services/middleware/fileUpload.middleware";
import { isScoutAuthenticated } from "../../../../shared/services/middleware/user.middleware";



const trailModel = new TrialModel()
const trialService = new TrialService({ trailModel })
const trialController = new TrialController({trialService})

router.post("/create-trial", isScoutAuthenticated, singleFileUpload('picture', ['image']), TrialValidation.createTrialParams, TrialValidation.validateFormData, trialController.create);
router.get("/trials", isScoutAuthenticated, TrialValidation.pagination, TrialValidation.validateFormData, trialController.getAllTrial);
router.get("/trial/:trialId", isScoutAuthenticated, trialController.getSingleTrial);


export default router;