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
const index_1 = require("../../../../shared/services/database/general/trial/index");
const date_fns_1 = require("date-fns");
const trial_response_1 = require("../../../../shared/types/interfaces/responses/general/trial.response");
const trialApplication_1 = require("../../../../shared/services/database/athletes/trialApplication");
class TrialService {
    constructor() {
        this.getAllTrial = (query) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(query.page) || 1; // or get from query params
            const limit = parseInt(query.limit) || 50;
            const skip = (page - 1) * limit;
            const trials = yield index_1.Trial.find().skip(skip).limit(limit).sort({ createdAt: -1 })
                .populate({
                path: 'scout', // Path to populate
                model: 'UserAccount', // Explicitly specifying the model is optional but sometimes necessary
                select: '-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt -accountType'
            });
            const total = yield index_1.Trial.countDocuments();
            return { result: {
                    totalPages: Math.ceil(total / limit),
                    currentPage: page,
                    total,
                    trials
                } };
        });
        this.getAllTrialByStatus = (query) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(query.page) || 1; // or get from query params
            const limit = parseInt(query.limit) || 50;
            const skip = (page - 1) * limit;
            console.log('query', query);
            const trials = yield index_1.Trial.find({ status: query.status }).skip(skip).limit(limit).sort({ createdAt: -1 })
                .select('-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt');
            const total = yield index_1.Trial.countDocuments({ status: query.status });
            return { result: {
                    totalPages: Math.ceil(total / limit),
                    currentPage: page,
                    total,
                    trials
                } };
        });
        this.getSingleTrial = (query) => __awaiter(this, void 0, void 0, function* () {
            const trial = yield index_1.Trial.findOne({ _id: query.trial })
                .select('-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt');
            if (!trial)
                return { errors: [{ message: "Athlete not found" }] };
            return { result: { trial: trial } };
        });
        this.search = (query) => __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            const page = parseInt(query.page) || 1; // or get from query params
            const limit = parseInt(query.limit) || 50;
            const skip = (page - 1) * limit;
            // OR logic: build conditions dynamically
            const orConditions = [];
            // orConditions.push({ accountType: AccountType.Athlete });
            // Case-insensitive partial match for name
            if (query.name) {
                // filter.name = { $regex: query.name, $options: 'i' };
                orConditions.push({ name: { $regex: query.name, $options: 'i' } });
            }
            if (query.organizerName) {
                // filter.trialType = query.type;
                orConditions.push({ organizerName: { $regex: query.organizerName, $options: 'i' } });
            }
            if (query.description) {
                // filter.location = query.location;
                orConditions.push({ description: { $regex: query.description, $options: 'i' } });
            }
            if (orConditions.length > 1) {
                filter.$or = orConditions;
            }
            let result = yield index_1.Trial.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
            let total = yield index_1.Trial.countDocuments(filter);
            return { result: {
                    totalPages: Math.ceil(total / limit),
                    currentPage: page,
                    total,
                    result
                } };
        });
        this.totalTrial = () => __awaiter(this, void 0, void 0, function* () {
            const totalTrial = yield index_1.Trial.countDocuments();
            return { result: {
                    totalTrial: totalTrial
                } };
        });
        this.totalLiveTrial = () => __awaiter(this, void 0, void 0, function* () {
            const totalTrial = yield index_1.Trial.countDocuments({ status: trial_response_1.TrialStatus.Open });
            return { result: {
                    totalTrial: totalTrial
                } };
        });
        this.totalTrialCreatedForThisMonth = () => __awaiter(this, void 0, void 0, function* () {
            const start = (0, date_fns_1.startOfMonth)(new Date());
            const end = (0, date_fns_1.endOfMonth)(new Date());
            const total = yield index_1.Trial.countDocuments({
                createdAt: { $gte: start, $lte: end }
            });
            return { result: {
                    totalTrial: total
                } };
        });
        this.lastMonthPercentCrate = () => __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            const lastMonthStart = (0, date_fns_1.startOfMonth)((0, date_fns_1.subMonths)(now, 1));
            const lastMonthEnd = (0, date_fns_1.endOfMonth)((0, date_fns_1.subMonths)(now, 1));
            const prevMonthStart = (0, date_fns_1.startOfMonth)((0, date_fns_1.subMonths)(now, 2));
            const prevMonthEnd = (0, date_fns_1.endOfMonth)((0, date_fns_1.subMonths)(now, 2));
            const lastMonthCount = yield index_1.Trial.countDocuments({
                createdAt: {
                    $gte: lastMonthStart,
                    $lte: lastMonthEnd
                }
            });
            const prevMonthCount = yield index_1.Trial.countDocuments({
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
        this.totalTrialCreatePerMonth = () => __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            const yearStart = (0, date_fns_1.startOfYear)(now);
            const yearEnd = (0, date_fns_1.endOfYear)(now);
            const monthlyRegistrations = yield index_1.Trial.aggregate([
                {
                    $match: {
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
        this.totalApplicationToday = () => __awaiter(this, void 0, void 0, function* () {
            const todayStart = (0, date_fns_1.startOfDay)(new Date());
            const todayEnd = (0, date_fns_1.endOfDay)(new Date());
            const total = yield trialApplication_1.TrialApplication.countDocuments({
                createdAt: {
                    $gte: todayStart,
                    $lte: todayEnd,
                },
            });
            return { result: {
                    totalApplication: total
                } };
        });
        this.totalApplication = () => __awaiter(this, void 0, void 0, function* () {
            const total = yield trialApplication_1.TrialApplication.countDocuments();
            return { result: {
                    totalApplication: total
                } };
        });
        this.lastMonthPercentApplied = () => __awaiter(this, void 0, void 0, function* () {
            const now = new Date();
            const lastMonthStart = (0, date_fns_1.startOfMonth)((0, date_fns_1.subMonths)(now, 1));
            const lastMonthEnd = (0, date_fns_1.endOfMonth)((0, date_fns_1.subMonths)(now, 1));
            const prevMonthStart = (0, date_fns_1.startOfMonth)((0, date_fns_1.subMonths)(now, 2));
            const prevMonthEnd = (0, date_fns_1.endOfMonth)((0, date_fns_1.subMonths)(now, 2));
            const lastMonthCount = yield trialApplication_1.TrialApplication.countDocuments({
                createdAt: {
                    $gte: lastMonthStart,
                    $lte: lastMonthEnd
                }
            });
            const prevMonthCount = yield trialApplication_1.TrialApplication.countDocuments({
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
    }
}
exports.default = TrialService;
