import express from "express";
const router = express.Router();
import TrialController from "./trial.controller";
import TrialService from "./trial.service";
import { AdminTrialValidation } from "./trial.validation";
import { isAdminAuthenticated } from "../../../../shared/services/middleware/admin.middleware";


const trialService = new TrialService()
const trialController = new TrialController({trialService})

router.get("/trials", isAdminAuthenticated,  AdminTrialValidation.pagination, AdminTrialValidation.validateFormData, trialController.getAllTrial);
router.get("/trials-by-status", isAdminAuthenticated,  AdminTrialValidation.status, AdminTrialValidation.validateFormData, trialController.getAllTrialByStatus);
router.get("/trial/:trialId", isAdminAuthenticated, trialController.getSingleTrial);
router.get("/trials/search", isAdminAuthenticated, trialController.search);

router.get("/trial-total", isAdminAuthenticated, trialController.totalTrial);
router.get("/trial-total-live", isAdminAuthenticated, trialController.totalLiveTrial);
router.get("/trial-total-month", isAdminAuthenticated, trialController.totalTrialCreatedForThisMonth);

router.get("/trial-last-month-percentage", isAdminAuthenticated, trialController.lastMonthPercentCrate);
router.get("/trails-create-per-month", isAdminAuthenticated, trialController.totalTrialCreatePerMonth);

router.get("/trial/application/total-application-today", isAdminAuthenticated, trialController.totalApplicationToday);
router.get("/trial/application/total-application", isAdminAuthenticated, trialController.totalApplication);
router.get("/trial/application/last-month-percentage-applied", isAdminAuthenticated, trialController.lastMonthPercentApplied);




export default router;