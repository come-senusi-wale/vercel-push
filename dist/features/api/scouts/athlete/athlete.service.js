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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../../../../shared/services/database/athletes/auth/index");
const athlete_response_1 = require("../../../../shared/types/interfaces/responses/athletes/athlete.response");
const index_2 = require("../../../../shared/services/database/athletes/performance/index");
const trial_request_1 = require("../../../../shared/types/interfaces/requests/scouts/trial.request");
const index_3 = require("../../../../shared/services/database/general/trial/index");
class AthleteService {
    constructor({ userModel }) {
        this.getAllAthlete = (query) => __awaiter(this, void 0, void 0, function* () {
            const filters = {
                accountType: athlete_response_1.AccountType.Athlete, // or any value from your AccountType enum
                emailVerified: true // or false
            };
            const pipeline = [
                { $match: filters },
                { $sample: { size: parseInt(query.number) } },
                {
                    $project: {
                        password: 0,
                        emailOtp: 0,
                        passwordOtp: 0,
                        emailOtpCreatedAt: 0,
                        passwordOtpCreatedAt: 0
                    }
                }
            ];
            const randomFilteredUsers = yield index_1.UserAccount.aggregate(pipeline);
            return { result: randomFilteredUsers };
        });
        this.getSingleAthlete = (query) => __awaiter(this, void 0, void 0, function* () {
            const athlete = yield this._userModel.checkIfExist({ _id: query.athlete, accountType: athlete_response_1.AccountType.Athlete });
            if (!athlete.status)
                return { errors: [{ message: "Athlete not found" }] };
            const performance = yield index_2.Performance.find({ athlete: query.athlete }).limit(20).sort({ createdAt: -1 });
            return { result: { athlete, performance } };
        });
        this.search = (query) => __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            const page = parseInt(query.page) || 1; // or get from query params
            const limit = parseInt(query.limit) || 50;
            const skip = (page - 1) * limit;
            // OR logic: build conditions dynamically
            const orConditions = [];
            orConditions.push({ accountType: athlete_response_1.AccountType.Athlete });
            // Case-insensitive partial match for name
            if (query.name) {
                // filter.name = { $regex: query.name, $options: 'i' };
                orConditions.push({ name: { $regex: query.name, $options: 'i' } });
            }
            if (query.type) {
                // filter.trialType = query.type;
                orConditions.push({ trialType: query.type });
            }
            if (query.location) {
                orConditions.push({ 'location.country': { $regex: query.location, $options: 'i' } });
                orConditions.push({ 'location.city': { $regex: query.location, $options: 'i' } });
            }
            if (query.eligibility) {
                // filter.eligibility = query.eligibility;
                orConditions.push({ eligibility: { $regex: query.eligibility, $options: 'i' } });
            }
            if (orConditions.length > 1) {
                filter.$or = orConditions;
            }
            let result = {};
            if (query.category == trial_request_1.ScoutSearchType.Trial) {
                const trials = yield index_3.Trial.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
                const totalTrial = yield index_3.Trial.countDocuments(filter);
                result = {
                    trial: {
                        totalPages: Math.ceil(totalTrial / limit),
                        currentPage: page,
                        total: totalTrial,
                        trials: trials
                    }
                };
            }
            else if (query.category == trial_request_1.ScoutSearchType.Athlete) {
                const athletes = yield index_1.UserAccount.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
                const totalAthlete = yield index_1.UserAccount.countDocuments(filter);
                result = {
                    athlete: {
                        totalPages: Math.ceil(totalAthlete / limit),
                        currentPage: page,
                        total: totalAthlete,
                        athletes: athletes
                    },
                };
            }
            else {
                const athletes = yield index_1.UserAccount.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 })
                    .select('-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt');
                const totalAthlete = yield index_1.UserAccount.countDocuments(filter);
                const trials = yield index_3.Trial.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
                const totalTrial = yield index_3.Trial.countDocuments(filter);
                result = {
                    athlete: {
                        totalPages: Math.ceil(totalAthlete / limit),
                        currentPage: page,
                        total: totalAthlete,
                        athletes: athletes
                    },
                    trial: {
                        totalPages: Math.ceil(totalTrial / limit),
                        currentPage: page,
                        total: totalTrial,
                        trials: trials
                    }
                };
            }
            return { result: result };
        });
        this.getAllPerformance = (query) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(query.page) || 1; // or get from query params
            const limit = parseInt(query.limit) || 50;
            const skip = (page - 1) * limit;
            const performances = yield index_2.Performance.find().skip(skip).limit(limit).sort({ createdAt: -1 })
                .populate({
                path: 'athlete', // Path to populate
                model: 'UserAccount', // Explicitly specifying the model is optional but sometimes necessary
                select: '-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt -accountType'
            });
            const total = yield index_2.Performance.countDocuments();
            return { result: {
                    totalPages: Math.ceil(total / limit),
                    currentPage: page,
                    total,
                    performances
                } };
        });
        this.getSinglePerformance = (query) => __awaiter(this, void 0, void 0, function* () {
            const performance = yield index_2.Performance.findOne({ _id: query.performance })
                .populate({
                path: 'athlete', // Path to populate
                model: 'UserAccount', // Explicitly specifying the model is optional but sometimes necessary
                select: '-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt -accountType'
            });
            if (!performance)
                return { errors: [{ message: "Activity not found" }] };
            return { result: performance };
        });
        this._userModel = userModel;
    }
}
exports.default = AthleteService;
