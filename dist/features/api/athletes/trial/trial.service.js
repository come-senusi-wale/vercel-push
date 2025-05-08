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
const index_1 = require("../../../../shared/services/database/general/trial/index");
const trial_request_1 = require("../../../../shared/types/interfaces/requests/athletes/trial.request");
const bocket_1 = __importDefault(require("../../../../shared/services/cloudinary/bocket"));
const trialApplication_rseponse_1 = require("../../../../shared/types/interfaces/responses/athletes/trialApplication.rseponse");
const index_2 = require("../../../../shared/services/database/athletes/trialApplication/index");
const index_3 = require("../../../../shared/services/database/athletes/auth/index");
class TrialService {
    constructor({ trailModel, trialApplicationModel }) {
        this.allPaginatedTrial = (option) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const trials = yield this._trailModel.getAll({}, option);
            if (!trials.status)
                return { errors: [{ message: trials.error }] };
            return { trials: (_a = trials.data) === null || _a === void 0 ? void 0 : _a.getResponse };
        });
        this.singleTrial = (option) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const trial = yield this._trailModel.checkIfExist({ _id: option.trialId });
            if (!trial.status)
                return { errors: [{ message: trial.error }] };
            return { trial: (_a = trial.data) === null || _a === void 0 ? void 0 : _a.getModel };
        });
        this.searchTrial = (query) => __awaiter(this, void 0, void 0, function* () {
            const filter = {};
            const page = parseInt(query.page) || 1; // or get from query params
            const limit = parseInt(query.limit) || 50;
            const skip = (page - 1) * limit;
            // OR logic: build conditions dynamically
            const orConditions = [];
            // Case-insensitive partial match for name
            if (query.name) {
                filter.name = { $regex: query.name, $options: 'i' };
            }
            if (query.type) {
                // filter.trialType = query.type;
                orConditions.push({ trialType: query.type });
            }
            if (query.gender) {
                orConditions.push({ gender: query.gender });
            }
            if (query.location) {
                // filter.location = query.location;
                orConditions.push({ location: { $regex: query.location, $options: 'i' } });
            }
            if (query.eligibility) {
                // filter.eligibility = query.eligibility;
                orConditions.push({ eligibility: { $regex: query.eligibility, $options: 'i' } });
            }
            if (typeof query.free === 'boolean') {
                // filter.free = query.free;
                orConditions.push({ free: query.free });
            }
            if (typeof query.free === 'string') {
                const checkFree = filter.free = query.free === 'true';
                orConditions.push({ free: checkFree });
            }
            console.log("filter", filter);
            let result = yield index_1.Trial.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
            let total = yield index_1.Trial.countDocuments(filter);
            if (query.searchType == trial_request_1.AthleteSearchType.Scout) {
                result = yield index_3.UserAccount.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
                total = yield index_3.UserAccount.countDocuments(filter);
            }
            else {
                result = yield index_1.Trial.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 });
                total = yield index_1.Trial.countDocuments(filter);
            }
            return { result: {
                    totalPages: Math.ceil(total / limit),
                    currentPage: page,
                    total,
                    result
                } };
        });
        this.applyForTrial = (payload) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const checkApplication = yield this._trialApplicationModel.checkIfExist({ athlete: payload.userId, trial: payload.trial.trial });
            if (checkApplication.status)
                return { errors: [{ message: "You had applied for this trial" }] };
            if (!payload.file && !((_a = payload.file) === null || _a === void 0 ? void 0 : _a.buffer))
                return { errors: [{ message: "Document is required" }] };
            const uploadResult = yield new Promise((resolve, reject) => {
                const stream = bocket_1.default.uploader.upload_stream({ folder: "my_app_images" }, (error, result) => {
                    if (error || !result)
                        return { errors: [{ message: "unable to upload image" }] };
                    resolve({ url: result.secure_url });
                });
                stream.write(payload.file.buffer);
                stream.end();
            });
            const document = uploadResult.url;
            const trailPayload = Object.assign({ athlete: payload.userId, document, status: trialApplication_rseponse_1.TrialApplicationStatus.Pending }, payload.trial);
            const apply = yield this._trialApplicationModel.create(trailPayload);
            if (!apply.status)
                return { errors: [{ message: apply.error }] };
            return { result: (_b = apply.data) === null || _b === void 0 ? void 0 : _b.getModel };
        });
        this.getUrTrial = (query) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(query.page) || 1; // or get from query params
            const limit = parseInt(query.limit) || 50;
            const skip = (page - 1) * limit;
            const trials = yield index_2.TrialApplication.find({ athlete: query.userId }).skip(skip).limit(limit).sort({ createdAt: -1 })
                .populate({
                path: 'trial', // Path to populate
                model: 'Trials' // Explicitly specifying the model is optional but sometimes necessary
            });
            const total = yield index_2.TrialApplication.countDocuments({ athlete: query.userId });
            return { result: {
                    totalPages: Math.ceil(total / limit),
                    currentPage: page,
                    total,
                    trials
                } };
        });
        this.getUrSingleTrial = (query) => __awaiter(this, void 0, void 0, function* () {
            const trial = yield index_2.TrialApplication.findOne({ athlete: query.userId, _id: query.trial })
                .populate({
                path: 'trial', // Path to populate
                model: 'Trials' // Explicitly specifying the model is optional but sometimes necessary
            });
            if (!trial)
                return { errors: [{ message: "Trial not Found" }] };
            return { result: trial };
        });
        this._trailModel = trailModel;
        this._trialApplicationModel = trialApplicationModel;
    }
}
exports.default = TrialService;
