import { body, query, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const pagination = [
    query("page").notEmpty(),
    query("limit").notEmpty(),
];

export const bio = [
    body("name").notEmpty(),
    body("title").notEmpty(),
    body("position").notEmpty(),
    body("country").notEmpty(),
    body("city").notEmpty(),
];

export const about = [
    body("about").notEmpty(),
];

export const addSports = [
    body("newSports").notEmpty(),
];

export const removeSports = [
    body("sportsToRemove").notEmpty(),
];

export const addLookFor = [
    body("newLookFor").notEmpty(),
];

export const removeLookFor = [
    body("lookForToRemove").notEmpty(),
];

export const validateFormData = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
};

export const ScoutProfileValidation = {
    validateFormData,
    pagination,
    bio,
    about,
    addSports,
    removeSports,
    addLookFor,
    removeLookFor,
}