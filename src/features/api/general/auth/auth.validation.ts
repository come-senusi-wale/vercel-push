import { body, query, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const registerParams = [
    body("email").isEmail(),
    body("password").notEmpty(),
    body("name").notEmpty(),
    body("accountType").notEmpty(),
];

export const resendEmailParams = [
    body("email").isEmail(),
];

export const verifyEmailParams = [
    body("email").isEmail(),
    body("otp").notEmpty(),
];

export const loginParams = [
    body("email").isEmail(),
    body("password").notEmpty(),
];

export const forgotPasswordParams = [
    body("email").isEmail(),
];

export const verifyPasswordOtpParams = [
    body("email").isEmail(),
    body("otp").notEmpty(),
];

export const resetPasswordParams = [
    body("email").isEmail(),
    body("password").notEmpty(),
];

export const changePasswordParams = [
    body("oldPassword").notEmpty(),
    body("newPassword").notEmpty(),
];

export const changeNotificationStatusParams = [
    body("alertType").notEmpty(),
    body("status").notEmpty(),
];

export const validateFormData = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
};

export const AuthValidation = {
    validateFormData,
    registerParams,
    resendEmailParams,
    verifyEmailParams,
    loginParams,
    forgotPasswordParams,
    verifyPasswordOtpParams,
    resetPasswordParams,
    changePasswordParams,
    changeNotificationStatusParams,
}