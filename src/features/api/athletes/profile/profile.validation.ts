import { body, query, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

export const pagination = [
    query("page").notEmpty(),
    query("limit").notEmpty(),
];

export const bio = [
    body("name").notEmpty(),
    body("skill").notEmpty(),
    body("position").notEmpty(),
    body("country").notEmpty(),
    body("city").notEmpty(),
];

export const about = [
    body("about").notEmpty(),
];

export const addAchievement = [
    body("title").notEmpty(),
    body("sport").notEmpty(),
    body("date").notEmpty(),
    body("description").notEmpty(),
];

export const editAchievement = [
    body("achievementId").notEmpty(),
    body("title").notEmpty(),
    body("sport").notEmpty(),
    body("date").notEmpty(),
    body("description").notEmpty(),
];

export const removeAchievement = [
    body("achievementId").notEmpty(),
];

export const addExperience = [
    body("title").notEmpty(),
    body("sport").notEmpty(),
    body("date").notEmpty(),
    body("description").notEmpty(),
];

export const editExperience = [
    body("experienceId").notEmpty(),
    body("title").notEmpty(),
    body("sport").notEmpty(),
    body("date").notEmpty(),
    body("description").notEmpty(),
];

export const removeExperience = [
    body("experienceId").notEmpty(),
];

export const addEducation = [
    body("school").notEmpty(),
    body("degree").notEmpty(),
    body("field").notEmpty(),
    body("startDate").notEmpty(),
    body("endDate").notEmpty(),
    body("description").notEmpty(),
];

export const editEducation = [
    body("educationId").notEmpty(),
    body("school").notEmpty(),
    body("degree").notEmpty(),
    body("field").notEmpty(),
    body("startDate").notEmpty(),
    body("endDate").notEmpty(),
    body("description").notEmpty(),
];

export const removeEducation = [
    body("educationId").notEmpty(),
];

export const addStatistic = [
    body("height").notEmpty(),
    body("weight").notEmpty(),
    body("bodyFat").notEmpty(),
    body("BMI").notEmpty(),
    body("maxHeight").notEmpty(),
    body("v02Max").notEmpty(),
    body("sprintSpeed").notEmpty(),
    body("verticalJump").notEmpty(),
    body("agility").notEmpty(),
];



export const validateFormData = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
};

export const AthleteProfileValidation = {
    validateFormData,
    pagination,
    bio,
    about,
    addAchievement,
    editAchievement,
    removeAchievement,
    addExperience,
    editExperience,
    removeExperience,
    addEducation,
    editEducation,
    removeEducation,
    addStatistic,
}