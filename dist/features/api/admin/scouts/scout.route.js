"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const scout_controller_1 = __importDefault(require("./scout.controller"));
const scout_service_1 = __importDefault(require("./scout.service"));
const scout_validation_1 = require("./scout.validation");
const index_1 = __importDefault(require("../../../../shared/services/database/athletes/auth/index"));
const admin_middleware_1 = require("../../../../shared/services/middleware/admin.middleware");
const userModel = new index_1.default();
const scoutService = new scout_service_1.default({ userModel });
const scoutController = new scout_controller_1.default({ scoutService });
router.get("/scouts", admin_middleware_1.isAdminAuthenticated, scout_validation_1.AdminScoutValidation.pagination, scout_validation_1.AdminScoutValidation.validateFormData, scoutController.getAllScout);
router.get("/scouts-by-status", admin_middleware_1.isAdminAuthenticated, scout_validation_1.AdminScoutValidation.status, scout_validation_1.AdminScoutValidation.validateFormData, scoutController.getAllScoutByStatus);
router.get("/scout/:scoutId", admin_middleware_1.isAdminAuthenticated, scoutController.getSingleScout);
router.get("/scouts/search", admin_middleware_1.isAdminAuthenticated, scoutController.search);
router.get("/scouts-total", admin_middleware_1.isAdminAuthenticated, scoutController.totalScouts);
router.get("/scout-last-month-percentage", admin_middleware_1.isAdminAuthenticated, scoutController.lastMonthPercentReg);
router.get("/scout-reg-per-month", admin_middleware_1.isAdminAuthenticated, scoutController.totalRegPerMonth);
router.post("/scouts-change-status", admin_middleware_1.isAdminAuthenticated, scout_validation_1.AdminScoutValidation.changeStatus, scout_validation_1.AdminScoutValidation.validateFormData, scoutController.changeStatus);
exports.default = router;
