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
class AthleteService {
    constructor({ userModel }) {
        this.getAllAthlete = (query) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(query.page) || 1; // or get from query params
            const limit = parseInt(query.limit) || 50;
            const skip = (page - 1) * limit;
            const athletes = yield index_1.UserAccount.find({ accountType: athlete_response_1.AccountType.Athlete }).skip(skip).limit(limit).sort({ createdAt: -1 })
                .select('-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt');
            const total = yield index_1.UserAccount.countDocuments({ accountType: athlete_response_1.AccountType.Athlete });
            return { result: {
                    totalPages: Math.ceil(total / limit),
                    currentPage: page,
                    total,
                    athletes
                } };
        });
        this.getAllAthleteByStatus = (query) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(query.page) || 1; // or get from query params
            const limit = parseInt(query.limit) || 50;
            const skip = (page - 1) * limit;
            const athletes = yield index_1.UserAccount.find({ accountType: athlete_response_1.AccountType.Athlete, accountStatus: query.status }).skip(skip).limit(limit).sort({ createdAt: -1 })
                .select('-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt');
            const total = yield index_1.UserAccount.countDocuments({ accountType: athlete_response_1.AccountType.Athlete, accountStatus: query.status });
            return { result: {
                    totalPages: Math.ceil(total / limit),
                    currentPage: page,
                    total,
                    athletes
                } };
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
                filter.name = { $regex: query.name, $options: 'i' };
            }
            if (query.email) {
                // filter.trialType = query.type;
                orConditions.push({ email: { $regex: query.sport, $options: 'i' } });
            }
            if (query.sport) {
                // filter.location = query.location;
                orConditions.push({ skill: { $regex: query.sport, $options: 'i' } });
            }
            if (query.position) {
                // filter.eligibility = query.eligibility;
                orConditions.push({ position: { $regex: query.position, $options: 'i' } });
            }
            if (orConditions.length > 1) {
                filter.$or = orConditions;
            }
            let result = yield index_1.UserAccount.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
            let total = yield index_1.UserAccount.countDocuments(filter);
            return { result: {
                    totalPages: Math.ceil(total / limit),
                    currentPage: page,
                    total,
                    result
                } };
        });
        this._userModel = userModel;
    }
}
exports.default = AthleteService;
