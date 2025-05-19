import express from "express";
const router = express.Router();
import PerformanceController from "./performance.controller";
import PerformanceService from "./performance.service";
import { AthletePerformanceValidation } from "./performance.validation";
import { isAthleteAuthenticated } from "../../../../shared/services/middleware/user.middleware";
import PerformanceModel from "../../../../shared/services/database/athletes/performance/index";
import { singleFileUpload } from "../../../../shared/services/middleware/fileUpload.middleware";



const performanceModel = new PerformanceModel()
const performanceService = new PerformanceService({ performanceModel })
const performanceController = new PerformanceController({performanceService})


router.post("/performance", isAthleteAuthenticated, singleFileUpload('picture', ['image', 'video']), AthletePerformanceValidation.postPerformance, AthletePerformanceValidation.validateFormData, performanceController.postPerformance);
router.get("/performance", isAthleteAuthenticated, AthletePerformanceValidation.pagination, AthletePerformanceValidation.validateFormData, performanceController.getAllPerformance);
router.get("/performance/ur", isAthleteAuthenticated, AthletePerformanceValidation.pagination, AthletePerformanceValidation.validateFormData, performanceController.getAllUrPerformance);
router.get("/performance/ur/:performanceId", isAthleteAuthenticated, performanceController.getUrSingleTrial);




export default router;