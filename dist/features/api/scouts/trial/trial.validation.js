"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrialValidation = exports.validateFormData = exports.pagination = exports.createTrialParams = void 0;
const express_validator_1 = require("express-validator");
exports.createTrialParams = [
    (0, express_validator_1.body)("name").notEmpty(),
    (0, express_validator_1.body)("trialType").notEmpty(),
    (0, express_validator_1.body)("organizerName").notEmpty(),
    (0, express_validator_1.body)("trialDate").notEmpty(),
    (0, express_validator_1.body)("registrationDeadline").notEmpty(),
    (0, express_validator_1.body)("location").notEmpty(),
    (0, express_validator_1.body)("eligibility").notEmpty(),
    (0, express_validator_1.body)("skillLevel").notEmpty(),
    (0, express_validator_1.body)("specificRequirement").notEmpty(),
    (0, express_validator_1.body)("trialFees").notEmpty(),
    (0, express_validator_1.body)("free").notEmpty(),
    (0, express_validator_1.body)("refoundPolicy").notEmpty(),
    (0, express_validator_1.body)("documentRequirement").notEmpty(),
    (0, express_validator_1.body)("description").notEmpty(),
    (0, express_validator_1.body)("equipmentNeeded").notEmpty(),
];
exports.pagination = [
    (0, express_validator_1.query)("page").notEmpty(),
    (0, express_validator_1.query)("limit").notEmpty(),
];
const validateFormData = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};
exports.validateFormData = validateFormData;
exports.TrialValidation = {
    validateFormData: exports.validateFormData,
    createTrialParams: exports.createTrialParams,
    pagination: exports.pagination,
};
