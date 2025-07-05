"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthValidation = exports.validateFormData = exports.pagination = exports.changeRoleParams = exports.changeStatusParams = exports.resetPasswordParams = exports.verifyPasswordOtpParams = exports.forgotPasswordParams = exports.loginParams = exports.verifyEmailParams = exports.resendEmailParams = exports.registerParams = void 0;
const express_validator_1 = require("express-validator");
exports.registerParams = [
    (0, express_validator_1.body)("email").isEmail(),
    (0, express_validator_1.body)("password").notEmpty(),
    (0, express_validator_1.body)("role").notEmpty(),
    (0, express_validator_1.body)("name").optional()
];
exports.resendEmailParams = [
    (0, express_validator_1.body)("email").isEmail(),
];
exports.verifyEmailParams = [
    (0, express_validator_1.body)("email").isEmail(),
    (0, express_validator_1.body)("otp").notEmpty(),
];
exports.loginParams = [
    (0, express_validator_1.body)("email").isEmail(),
    (0, express_validator_1.body)("password").notEmpty(),
];
exports.forgotPasswordParams = [
    (0, express_validator_1.body)("email").isEmail(),
];
exports.verifyPasswordOtpParams = [
    (0, express_validator_1.body)("email").isEmail(),
    (0, express_validator_1.body)("otp").notEmpty(),
];
exports.resetPasswordParams = [
    (0, express_validator_1.body)("email").isEmail(),
    (0, express_validator_1.body)("password").notEmpty(),
];
exports.changeStatusParams = [
    (0, express_validator_1.body)("admin").notEmpty(),
    (0, express_validator_1.body)("status").notEmpty(),
];
exports.changeRoleParams = [
    (0, express_validator_1.body)("admin").notEmpty(),
    (0, express_validator_1.body)("role").notEmpty(),
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
exports.AdminAuthValidation = {
    validateFormData: exports.validateFormData,
    registerParams: exports.registerParams,
    resendEmailParams: exports.resendEmailParams,
    verifyEmailParams: exports.verifyEmailParams,
    loginParams: exports.loginParams,
    forgotPasswordParams: exports.forgotPasswordParams,
    verifyPasswordOtpParams: exports.verifyPasswordOtpParams,
    resetPasswordParams: exports.resetPasswordParams,
    changeStatusParams: exports.changeStatusParams,
    changeRoleParams: exports.changeRoleParams,
    pagination: exports.pagination,
};
