"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const athlete_controller_1 = __importDefault(require("./athlete.controller"));
const athlete_service_1 = __importDefault(require("./athlete.service"));
const athlete_validation_1 = require("./athlete.validation");
const index_1 = __importDefault(require("../../../../shared/services/database/athletes/auth/index"));
const user_middleware_1 = require("../../../../shared/services/middleware/user.middleware");
const userModel = new index_1.default();
const athleteService = new athlete_service_1.default({ userModel });
const athleteController = new athlete_controller_1.default({ athleteService });
router.get("/athletes", user_middleware_1.isScoutAuthenticated, athlete_validation_1.AthleteValidation.limit, athlete_validation_1.AthleteValidation.validateFormData, athleteController.getAllAthlete);
router.get("/athlete/:athleteId", user_middleware_1.isScoutAuthenticated, athleteController.getSingleAthlete);
router.get("/search", user_middleware_1.isScoutAuthenticated, athleteController.search);
exports.default = router;
