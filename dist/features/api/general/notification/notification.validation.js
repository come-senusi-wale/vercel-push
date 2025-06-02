"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationValidation = exports.validateFormData = exports.pagination = void 0;
const express_validator_1 = require("express-validator");
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
exports.NotificationValidation = {
    validateFormData: exports.validateFormData,
    pagination: exports.pagination,
};
