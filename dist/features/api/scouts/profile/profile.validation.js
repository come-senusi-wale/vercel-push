"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoutProfileValidation = exports.validateFormData = exports.removeLookFor = exports.addLookFor = exports.removeSports = exports.addSports = exports.about = exports.bio = exports.pagination = void 0;
const express_validator_1 = require("express-validator");
exports.pagination = [
    (0, express_validator_1.query)("page").notEmpty(),
    (0, express_validator_1.query)("limit").notEmpty(),
];
exports.bio = [
    (0, express_validator_1.body)("name").notEmpty(),
    (0, express_validator_1.body)("title").notEmpty(),
    (0, express_validator_1.body)("position").notEmpty(),
    (0, express_validator_1.body)("country").notEmpty(),
    (0, express_validator_1.body)("city").notEmpty(),
];
exports.about = [
    (0, express_validator_1.body)("about").notEmpty(),
];
exports.addSports = [
    (0, express_validator_1.body)("newSports").notEmpty(),
];
exports.removeSports = [
    (0, express_validator_1.body)("sportsToRemove").notEmpty(),
];
exports.addLookFor = [
    (0, express_validator_1.body)("newLookFor").notEmpty(),
];
exports.removeLookFor = [
    (0, express_validator_1.body)("lookForToRemove").notEmpty(),
];
const validateFormData = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};
exports.validateFormData = validateFormData;
exports.ScoutProfileValidation = {
    validateFormData: exports.validateFormData,
    pagination: exports.pagination,
    bio: exports.bio,
    about: exports.about,
    addSports: exports.addSports,
    removeSports: exports.removeSports,
    addLookFor: exports.addLookFor,
    removeLookFor: exports.removeLookFor,
};
