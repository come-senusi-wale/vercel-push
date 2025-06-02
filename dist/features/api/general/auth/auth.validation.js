"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = exports.validateFormData = exports.changeNotificationStatusParams = exports.changePasswordParams = exports.resetPasswordParams = exports.verifyPasswordOtpParams = exports.forgotPasswordParams = exports.loginParams = exports.verifyEmailParams = exports.resendEmailParams = exports.registerParams = void 0;
const express_validator_1 = require("express-validator");
exports.registerParams = [
    (0, express_validator_1.body)("email").isEmail(),
    (0, express_validator_1.body)("password").notEmpty(),
    (0, express_validator_1.body)("name").notEmpty(),
    (0, express_validator_1.body)("accountType").notEmpty(),
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
exports.changePasswordParams = [
    (0, express_validator_1.body)("oldPassword").notEmpty(),
    (0, express_validator_1.body)("newPassword").notEmpty(),
];
exports.changeNotificationStatusParams = [
    (0, express_validator_1.body)("alertType").notEmpty(),
    (0, express_validator_1.body)("status").notEmpty(),
];
const validateFormData = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};
exports.validateFormData = validateFormData;
exports.AuthValidation = {
    validateFormData: exports.validateFormData,
    registerParams: exports.registerParams,
    resendEmailParams: exports.resendEmailParams,
    verifyEmailParams: exports.verifyEmailParams,
    loginParams: exports.loginParams,
    forgotPasswordParams: exports.forgotPasswordParams,
    verifyPasswordOtpParams: exports.verifyPasswordOtpParams,
    resetPasswordParams: exports.resetPasswordParams,
    changePasswordParams: exports.changePasswordParams,
    changeNotificationStatusParams: exports.changeNotificationStatusParams,
};
