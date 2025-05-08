"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AthleteValidation = exports.validateFormData = exports.limit = exports.pagination = void 0;
const express_validator_1 = require("express-validator");
exports.pagination = [
    (0, express_validator_1.query)("page").notEmpty(),
    (0, express_validator_1.query)("limit").notEmpty(),
];
exports.limit = [
    (0, express_validator_1.query)("number").notEmpty(),
];
const validateFormData = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};
exports.validateFormData = validateFormData;
exports.AthleteValidation = {
    validateFormData: exports.validateFormData,
    pagination: exports.pagination,
    limit: exports.limit
};
