"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AthleteTrialValidation = exports.validateFormData = exports.applyTrial = exports.pagination = void 0;
const express_validator_1 = require("express-validator");
exports.pagination = [
    (0, express_validator_1.query)("page").notEmpty(),
    (0, express_validator_1.query)("limit").notEmpty(),
];
exports.applyTrial = [
    (0, express_validator_1.body)("trial").notEmpty(),
    (0, express_validator_1.body)("name").notEmpty(),
    (0, express_validator_1.body)("contactInfo").notEmpty(),
    (0, express_validator_1.body)("position").notEmpty(),
];
const validateFormData = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};
exports.validateFormData = validateFormData;
exports.AthleteTrialValidation = {
    validateFormData: exports.validateFormData,
    pagination: exports.pagination,
    applyTrial: exports.applyTrial
};
