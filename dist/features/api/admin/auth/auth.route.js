"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const index_1 = __importDefault(require("../../../../shared/services/encryption/index"));
const index_2 = __importDefault(require("../../../../shared/services/database/admin/auth/index"));
const auth_controller_1 = __importDefault(require("./auth.controller"));
const auth_service_1 = __importDefault(require("./auth.service"));
const auth_validation_1 = require("./auth.validation");
const adminModel = new index_2.default();
const auth = new index_1.default();
const authService = new auth_service_1.default({ adminModel, auth });
const authController = new auth_controller_1.default({ authService });
router.post("/signup", auth_validation_1.AdminAuthValidation.registerParams, auth_validation_1.AdminAuthValidation.validateFormData, authController.registerAdmin);
exports.default = router;
