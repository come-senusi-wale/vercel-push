"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccount = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const athlete_response_1 = require("../../../../types/interfaces/responses/athletes/athlete.response");
const athlete_dto_1 = __importDefault(require("../../../../types/dtos/athletes/athlete.dto"));
const LocationSchema = new mongoose_1.Schema({
    country: { type: String, default: '' },
    city: { type: String, default: '' },
});
const AchievementSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    sport: { type: String, required: true },
    description: { type: String, required: true },
});
const ExperienceSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    sport: { type: String, required: true },
    description: { type: String, required: true },
});
const EducationSchema = new mongoose_1.Schema({
    school: { type: String, required: true },
    degree: { type: String, required: true },
    field: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: mongoose_1.Schema.Types.Mixed, required: true }, // Date or string
    description: { type: String },
});
const StatisticSchema = new mongoose_1.Schema({
    height: { type: String, required: true },
    weight: { type: String, required: true },
    bodyFat: { type: String, required: true },
    BMI: { type: String, required: true },
    maxHeight: { type: String, required: true },
    v02Max: { type: String, required: true },
    sprintSpeed: { type: String, required: true },
    verticalJump: { type: String, required: true },
    agility: { type: String, required: true },
});
const UserAccountSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
    },
    password: {
        type: String,
    },
    accountType: {
        type: String,
        enum: Object.values(athlete_response_1.AccountType),
        required: true,
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    emailOtp: {
        type: String
    },
    emailOtpCreatedAt: {
        type: Date
    },
    passwordOtp: {
        type: String
    },
    passwordOtpCreatedAt: {
        type: Date
    },
    passwordOtpVerified: {
        type: Boolean,
        default: false
    },
    requestForPasswordChange: {
        type: Boolean,
        default: false
    },
    pushNotification: {
        type: Boolean,
        default: true
    },
    emailNotification: {
        type: Boolean,
        default: true
    },
    soundVibration: {
        type: Boolean,
        default: true
    },
    skill: { type: String, default: "" },
    position: { type: String, default: "" },
    location: { type: LocationSchema, default: () => ({}) },
    profileImg: { type: String, default: "" },
    about: { type: String, default: "" },
    statistic: { type: StatisticSchema, default: () => ({}) },
    achievement: { type: [AchievementSchema], default: [] },
    experience: { type: [ExperienceSchema], default: [] },
    education: { type: [EducationSchema], default: [] },
    title: { type: String, default: "" },
    sports: { type: [String], default: [] },
    lookFor: { type: [String], default: [] },
    accountStatus: {
        type: String,
        enum: Object.values(athlete_response_1.AccountStatus),
        default: athlete_response_1.AccountStatus.Active,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
UserAccountSchema.plugin(mongoose_paginate_v2_1.default);
exports.UserAccount = (0, mongoose_1.model)("UserAccount", UserAccountSchema);
class UserAccountModel {
    constructor() {
        this.createAccountToDB = (details) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.UserAccount.create(details);
                if (data) {
                    return { status: true, data: new athlete_dto_1.default(data) };
                }
                else {
                    return { status: false, error: "Couldn't create account" };
                }
            }
            catch (error) {
                return { status: false, error };
            }
        });
        this.checkIfExist = (details) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.UserAccount.findOne(details);
                if (data) {
                    return { status: true, data: new athlete_dto_1.default(data) };
                }
                else {
                    return { status: false, error: "no account find" };
                }
            }
            catch (error) {
                return { status: false, error };
            }
        });
        this.updateAccount = (id, details) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.UserAccount.findOneAndUpdate({ _id: id }, details, { new: true });
                if (data) {
                    return { status: true, data: new athlete_dto_1.default(data) };
                }
                else {
                    return { status: false, error: "Unable to update configuration" };
                }
            }
            catch (error) {
                return { status: false, error };
            }
        });
        this.UserAccount = exports.UserAccount;
    }
}
exports.default = UserAccountModel;
