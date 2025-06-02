"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminScoutValidation = exports.validateFormData = exports.status = exports.pagination = void 0;
const express_validator_1 = require("express-validator");
exports.pagination = [
    (0, express_validator_1.query)("page").notEmpty(),
    (0, express_validator_1.query)("limit").notEmpty(),
];
exports.status = [
    (0, express_validator_1.query)("page").notEmpty(),
    (0, express_validator_1.query)("limit").notEmpty(),
    (0, express_validator_1.query)("status").notEmpty(),
];
const validateFormData = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};
exports.validateFormData = validateFormData;
exports.AdminScoutValidation = {
    validateFormData: exports.validateFormData,
    pagination: exports.pagination,
    status: exports.status,
};
