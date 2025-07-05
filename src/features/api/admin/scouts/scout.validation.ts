import { body, query, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const pagination = [
    query("page").notEmpty(),
    query("limit").notEmpty(),
];

export const status = [
    query("page").notEmpty(),
    query("limit").notEmpty(),
    query("status").notEmpty(),
];

export const changeStatus = [
    body("user").notEmpty(),
    body("status").notEmpty(),
];

export const validateFormData = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
};

export const AdminScoutValidation = {
    validateFormData,
    pagination,
    status,
    changeStatus,
}