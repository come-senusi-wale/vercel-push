"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AthleteProfileValidation = exports.validateFormData = exports.addStatistic = exports.removeEducation = exports.editEducation = exports.addEducation = exports.removeExperience = exports.editExperience = exports.addExperience = exports.removeAchievement = exports.editAchievement = exports.addAchievement = exports.about = exports.bio = exports.pagination = void 0;
const express_validator_1 = require("express-validator");
exports.pagination = [
    (0, express_validator_1.query)("page").notEmpty(),
    (0, express_validator_1.query)("limit").notEmpty(),
];
exports.bio = [
    (0, express_validator_1.body)("name").notEmpty(),
    (0, express_validator_1.body)("skill").notEmpty(),
    (0, express_validator_1.body)("position").notEmpty(),
    (0, express_validator_1.body)("country").notEmpty(),
    (0, express_validator_1.body)("city").notEmpty(),
];
exports.about = [
    (0, express_validator_1.body)("about").notEmpty(),
];
exports.addAchievement = [
    (0, express_validator_1.body)("title").notEmpty(),
    (0, express_validator_1.body)("sport").notEmpty(),
    (0, express_validator_1.body)("date").notEmpty(),
    (0, express_validator_1.body)("description").notEmpty(),
];
exports.editAchievement = [
    (0, express_validator_1.body)("achievementId").notEmpty(),
    (0, express_validator_1.body)("title").notEmpty(),
    (0, express_validator_1.body)("sport").notEmpty(),
    (0, express_validator_1.body)("date").notEmpty(),
    (0, express_validator_1.body)("description").notEmpty(),
];
exports.removeAchievement = [
    (0, express_validator_1.body)("achievementId").notEmpty(),
];
exports.addExperience = [
    (0, express_validator_1.body)("title").notEmpty(),
    (0, express_validator_1.body)("sport").notEmpty(),
    (0, express_validator_1.body)("date").notEmpty(),
    (0, express_validator_1.body)("description").notEmpty(),
];
exports.editExperience = [
    (0, express_validator_1.body)("experienceId").notEmpty(),
    (0, express_validator_1.body)("title").notEmpty(),
    (0, express_validator_1.body)("sport").notEmpty(),
    (0, express_validator_1.body)("date").notEmpty(),
    (0, express_validator_1.body)("description").notEmpty(),
];
exports.removeExperience = [
    (0, express_validator_1.body)("experienceId").notEmpty(),
];
exports.addEducation = [
    (0, express_validator_1.body)("school").notEmpty(),
    (0, express_validator_1.body)("degree").notEmpty(),
    (0, express_validator_1.body)("field").notEmpty(),
    (0, express_validator_1.body)("startDate").notEmpty(),
    (0, express_validator_1.body)("endDate").notEmpty(),
    (0, express_validator_1.body)("description").notEmpty(),
];
exports.editEducation = [
    (0, express_validator_1.body)("educationId").notEmpty(),
    (0, express_validator_1.body)("school").notEmpty(),
    (0, express_validator_1.body)("degree").notEmpty(),
    (0, express_validator_1.body)("field").notEmpty(),
    (0, express_validator_1.body)("startDate").notEmpty(),
    (0, express_validator_1.body)("endDate").notEmpty(),
    (0, express_validator_1.body)("description").notEmpty(),
];
exports.removeEducation = [
    (0, express_validator_1.body)("educationId").notEmpty(),
];
exports.addStatistic = [
    (0, express_validator_1.body)("height").notEmpty(),
    (0, express_validator_1.body)("weight").notEmpty(),
    (0, express_validator_1.body)("bodyFat").notEmpty(),
    (0, express_validator_1.body)("BMI").notEmpty(),
    (0, express_validator_1.body)("maxHeight").notEmpty(),
    (0, express_validator_1.body)("v02Max").notEmpty(),
    (0, express_validator_1.body)("sprintSpeed").notEmpty(),
    (0, express_validator_1.body)("verticalJump").notEmpty(),
    (0, express_validator_1.body)("agility").notEmpty(),
];
const validateFormData = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};
exports.validateFormData = validateFormData;
exports.AthleteProfileValidation = {
    validateFormData: exports.validateFormData,
    pagination: exports.pagination,
    bio: exports.bio,
    about: exports.about,
    addAchievement: exports.addAchievement,
    editAchievement: exports.editAchievement,
    removeAchievement: exports.removeAchievement,
    addExperience: exports.addExperience,
    editExperience: exports.editExperience,
    removeExperience: exports.removeExperience,
    addEducation: exports.addEducation,
    editEducation: exports.editEducation,
    removeEducation: exports.removeEducation,
    addStatistic: exports.addStatistic,
};
