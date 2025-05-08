"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthValidation = exports.validateFormData = exports.registerParams = void 0;
const express_validator_1 = require("express-validator");
exports.registerParams = [
    (0, express_validator_1.body)("email").isEmail(),
    (0, express_validator_1.body)("password").notEmpty(),
];
const validateFormData = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};
exports.validateFormData = validateFormData;
exports.AdminAuthValidation = {
    validateFormData: exports.validateFormData,
    registerParams: exports.registerParams,
};
