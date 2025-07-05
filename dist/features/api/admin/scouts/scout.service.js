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
const date_fns_1 = require("date-fns");
class ScoutService {
    constructor({ userModel }) {
        this.getAllScout = (query) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(query.page) || 1; // or get from query params
            const limit = parseInt(query.limit) || 50;
            const skip = (page - 1) * limit;
            const scouts = yield index_1.UserAccount.find({ accountType: athlete_response_1.AccountType.Scout }).skip(skip).limit(limit).sort({ createdAt: -1 })
                .select('-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt');
            const total = yield index_1.UserAccount.countDocuments({ accountType: athlete_response_1.AccountType.Scout });
            return { result: {
                    totalPages: Math.ceil(total / limit),
                    currentPage: page,
                    total,
                    scouts
                } };
        });
        this.getAllScoutByStatus = (query) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(query.page) || 1; // or get from query params
            const limit = parseInt(query.limit) || 50;
            const skip = (page - 1) * limit;
            const scouts = yield index_1.UserAccount.find({ accountType: athlete_response_1.AccountType.Scout, accountStatus: query.status }).skip(skip).limit(limit).sort({ createdAt: -1 })
                .select('-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt');
            const total = yield index_1.UserAccount.countDocuments({ accountType: athlete_response_1.AccountType.Scout, accountStatus: query.status });
            return { result: {
                    totalPages: Math.ceil(total / limit),
                    currentPage: page,
                    total,
                    scouts
                } };
        });
        this.getSingleScout = (query) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const scout = yield this._userModel.checkIfExist({ _id: query.scout, accountType: athlete_response_1.AccountType.Scout });
            if (!scout.status)
                return { errors: [{ message: "Scout not found" }] };
            return { result: { scout: (_a = scout.data) === null || _a === void 0 ? void 0 : _a.getSecureResponse } };
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
        this.totalScouts = () => __awaiter(this, void 0, void 0, function* () {
            const totalScouts = yield index_1.UserAccount.countDocuments({ accountType: athlete_response_1.AccountType.Scout });
            return { result: {
                    totalScouts: totalScouts
                } };
        });
        this.lastMonthPercentReg = () => __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            const lastMonthStart = (0, date_fns_1.startOfMonth)((0, date_fns_1.subMonths)(now, 1));
            const lastMonthEnd = (0, date_fns_1.endOfMonth)((0, date_fns_1.subMonths)(now, 1));
            const prevMonthStart = (0, date_fns_1.startOfMonth)((0, date_fns_1.subMonths)(now, 2));
            const prevMonthEnd = (0, date_fns_1.endOfMonth)((0, date_fns_1.subMonths)(now, 2));
            console.log("lastMonthStart", lastMonthStart);
            console.log("lastMonthEnd", lastMonthEnd);
            console.log("prevMonthStart", prevMonthStart);
            console.log("prevMonthEnd", prevMonthEnd);
            const lastMonthCount = yield index_1.UserAccount.countDocuments({
                accountType: athlete_response_1.AccountType.Scout,
                createdAt: {
                    $gte: lastMonthStart,
                    $lte: lastMonthEnd
                }
            });
            const prevMonthCount = yield index_1.UserAccount.countDocuments({
                accountType: athlete_response_1.AccountType.Scout,
                createdAt: {
                    $gte: prevMonthStart,
                    $lte: prevMonthEnd
                }
            });
            let percentageChange = 0;
            if (prevMonthCount === 0 && lastMonthCount > 0) {
                percentageChange = 100; // New growth
            }
            else if (prevMonthCount === 0 && lastMonthCount === 0) {
                percentageChange = 0; // No change, no data
            }
            else {
                percentageChange = ((lastMonthCount - prevMonthCount) / prevMonthCount) * 100;
            }
            return { result: {
                    lastMonthCount,
                    prevMonthCount,
                    percentageChange: Math.round(percentageChange * 100) / 100, // round to 2 decimal places
                    trend: percentageChange > 0 ? 'increase' : percentageChange < 0 ? 'decrease' : 'no change'
                } };
        });
        this.totalRegPerMonth = () => __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            const yearStart = (0, date_fns_1.startOfYear)(now);
            const yearEnd = (0, date_fns_1.endOfYear)(now);
            const monthlyRegistrations = yield index_1.UserAccount.aggregate([
                {
                    $match: {
                        accountType: athlete_response_1.AccountType.Scout,
                        createdAt: {
                            $gte: yearStart,
                            $lte: yearEnd
                        }
                    }
                },
                {
                    $group: {
                        _id: { month: { $month: '$createdAt' } },
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { '_id.month': 1 }
                }
            ]);
            // Fill in months with 0 if no users were registered
            const result = {};
            for (let i = 1; i <= 12; i++) {
                const monthData = monthlyRegistrations.find(item => item._id.month === i);
                result[`Month ${i}`] = monthData ? monthData.count : 0;
            }
            return {
                result
            };
        });
        this.changeStatus = (data) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const checkUser = yield this._userModel.checkIfExist({ _id: data.user });
            if (!checkUser.status || !checkUser.data)
                return { errors: [{ message: "User not found" }] };
            const changeUserStatus = yield this._userModel.updateAccount(checkUser.data._id, { accountStatus: data.status });
            if (!changeUserStatus.status)
                return { errors: [{ message: "Unable to change account status" }] };
            return { result: (_a = changeUserStatus.data) === null || _a === void 0 ? void 0 : _a.getSecureResponse };
        });
        this._userModel = userModel;
    }
}
exports.default = ScoutService;
