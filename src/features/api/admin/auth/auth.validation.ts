import { body, query, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const registerParams = [
    body("email").isEmail(),
    body("password").notEmpty(),
    body("role").notEmpty(),
    body("name").optional()
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

export const changeStatusParams = [
    body("admin").notEmpty(),
    body("status").notEmpty(),
];

export const changeRoleParams = [
    body("admin").notEmpty(),
    body("role").notEmpty(),
];

export const pagination = [
    query("page").notEmpty(),
    query("limit").notEmpty(),
];

export const validateFormData = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
};

export const AdminAuthValidation = {
    validateFormData,
    registerParams,
    resendEmailParams,
    verifyEmailParams,
    loginParams,
    forgotPasswordParams,
    verifyPasswordOtpParams,
    resetPasswordParams,
    changeStatusParams,
    changeRoleParams,
    pagination,
}