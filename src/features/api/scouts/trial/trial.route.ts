import express from "express";
const router = express.Router();
import TrialController from "./trial.controller";
import TrialService from "./trial.service";
import { TrialValidation } from "./trial.validation";
import TrialModel from "../../../../shared/services/database/general/trial/index";
import TrialApplicationModel from "../../../../shared/services/database/athletes/trialApplication/index";
import NotificationModel from "../../../../shared/services/database/general/notification/index";
import { singleFileUpload } from "../../../../shared/services/middleware/fileUpload.middleware";
import { isScoutAuthenticated } from "../../../../shared/services/middleware/user.middleware";



const trailModel = new TrialModel()
const trialApplicationModel = new TrialApplicationModel()
const notificationModel = new NotificationModel()
const trialService = new TrialService({ trailModel, trialApplicationModel, notificationModel })
const trialController = new TrialController({trialService})

router.post("/create-trial", isScoutAuthenticated, singleFileUpload('picture', ['image']), TrialValidation.createTrialParams, TrialValidation.validateFormData, trialController.create);
router.get("/trials", isScoutAuthenticated, TrialValidation.pagination, TrialValidation.validateFormData, trialController.getAllTrial);
router.get("/trial/single", isScoutAuthenticated, trialController.getSingleTrial);
router.get("/trial/applicant/by/status", isScoutAuthenticated, TrialValidation.TrialApplicationByStatus, TrialValidation.validateFormData, trialController.getApplicantOnTrial);
router.post("/trial/accept", isScoutAuthenticated, TrialValidation.acceptTrial, TrialValidation.validateFormData, trialController.acceptApplicant);
router.post("/trial/reject", isScoutAuthenticated, TrialValidation.acceptTrial, TrialValidation.validateFormData, trialController.rejectApplicant);


export default router;