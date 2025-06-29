"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminNotificationValidation = exports.validateFormData = exports.notifications = exports.pagination = exports.createNotification = void 0;
const express_validator_1 = require("express-validator");
exports.createNotification = [
    (0, express_validator_1.body)("user").notEmpty(),
    (0, express_validator_1.body)("title").notEmpty(),
    (0, express_validator_1.body)("message").notEmpty(),
    (0, express_validator_1.body)("type").notEmpty(),
];
exports.pagination = [
    (0, express_validator_1.query)("page").notEmpty(),
    (0, express_validator_1.query)("limit").notEmpty(),
];
exports.notifications = [
    (0, express_validator_1.query)("page").notEmpty(),
    (0, express_validator_1.query)("limit").notEmpty(),
    (0, express_validator_1.query)("recipient").notEmpty(),
];
const validateFormData = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};
exports.validateFormData = validateFormData;
exports.AdminNotificationValidation = {
    validateFormData: exports.validateFormData,
    createNotification: exports.createNotification,
    pagination: exports.pagination,
    notifications: exports.notifications,
};
