import { body, query, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const pagination = [
    query("page").notEmpty(),
    query("limit").notEmpty(),
];

export const notifications = [
    query("page").notEmpty(),
    query("limit").notEmpty(),
    query("recipient").notEmpty(),
];

export const validateFormData = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
};

export const NotificationValidation = {
    validateFormData,
    pagination,
    notifications,
}