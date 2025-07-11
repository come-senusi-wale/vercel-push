import { body, query, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const createTrialParams = [
    body("name").notEmpty(),
    body("trialType").notEmpty(),
    body("organizerName").notEmpty(),
    body("trialDate").notEmpty(),
    body("registrationDeadline").notEmpty(),
    body("location").notEmpty(),
    body("eligibility").notEmpty(),
    body("skillLevel").notEmpty(),
    body("specificRequirement").notEmpty(),
    body("trialFees").notEmpty(),
    body("free").notEmpty(),
    body("refoundPolicy").notEmpty(),
    body("documentRequirement").notEmpty(),
    body("description").notEmpty(),
    body("equipmentNeeded").notEmpty(),
 
];

export const pagination = [
    query("page").notEmpty(),
    query("limit").notEmpty(),
];

export const acceptTrial = [
    body("trialId").notEmpty(),
    body("athleteId").notEmpty(),
];

export const TrialApplicationByStatus = [
    query("page").notEmpty(),
    query("limit").notEmpty(),
    query("trialId").notEmpty(),
];


export const validateFormData = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
};

export const TrialValidation = {
    validateFormData,
    createTrialParams,
    pagination,
    acceptTrial,
    TrialApplicationByStatus
}