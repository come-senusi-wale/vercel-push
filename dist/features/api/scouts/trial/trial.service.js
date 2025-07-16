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
const bocket_1 = __importDefault(require("../../../../shared/services/cloudinary/bocket"));
const trialApplication_1 = require("../../../../shared/services/database/athletes/trialApplication");
const trialApplication_rseponse_1 = require("../../../../shared/types/interfaces/responses/athletes/trialApplication.rseponse");
const auth_1 = require("../../../../shared/services/database/athletes/auth");
const mongoose_1 = __importDefault(require("mongoose"));
class TrialService {
    constructor({ trailModel, trialApplicationModel, notificationModel }) {
        this.create = (trial, file, userId) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            let trialFile = "";
            if (file && (file === null || file === void 0 ? void 0 : file.buffer)) {
                const uploadResult = yield new Promise((resolve, reject) => {
                    const stream = bocket_1.default.uploader.upload_stream({ folder: "my_app_images" }, (error, result) => {
                        if (error || !result)
                            return { errors: [{ message: "unable to upload image" }] };
                        resolve({ url: result.secure_url });
                    });
                    stream.write(file.buffer);
                    stream.end();
                });
                trialFile = uploadResult.url;
            }
            // if (file) {
            //     const filename = uuidv4();
            //     const result = await uploadToS3(file.buffer, `${filename}.jpg`);
            //     trialFile = result?.Location!;
            // } 
            let trialPayload = Object.assign({ scout: userId, file: trialFile }, trial);
            const createTrial = yield this._trailModel.create(trialPayload);
            if (!createTrial.status)
                return { errors: [{ message: createTrial.error }] };
            return { trial: (_a = createTrial.data) === null || _a === void 0 ? void 0 : _a.getModel };
        });
        this.getAllTrial = (query) => __awaiter(this, void 0, void 0, function* () {
            // const page: number = parseInt(query.page!) || 1; // or get from query params
            // const limit: number = parseInt(query.limit!) || 50;
            // const skip = (page - 1) * limit;
            // const trials = await Trial.find({scout: query.userId}).skip(skip).limit(limit).sort({createdAt: -1})
            // const total = await Trial.countDocuments({scout: query.userId})
            // return { result: {
            //     totalPages: Math.ceil(total / limit),
            //     currentPage: page,
            //     total,
            //     trials
            // } };
            const page = parseInt(query.page) || 1;
            const limit = parseInt(query.limit) || 50;
            const skip = (page - 1) * limit;
            const trialsWithPendingCount = yield index_1.Trial.aggregate([
                {
                    $match: { scout: new mongoose_1.default.Types.ObjectId(query.userId) }
                },
                {
                    $sort: { createdAt: -1 }
                },
                {
                    $skip: skip
                },
                {
                    $limit: limit
                },
                {
                    $lookup: {
                        from: "trialapplications",
                        localField: "_id",
                        foreignField: "trial",
                        as: "applications"
                    }
                },
                {
                    $addFields: {
                        pendingApplicationsCount: {
                            $size: {
                                $filter: {
                                    input: "$applications",
                                    as: "app",
                                    cond: { $eq: ["$$app.status", "pending"] }
                                }
                            }
                        }
                    }
                },
                {
                    $project: {
                        applications: 0 // exclude full applications array
                    }
                }
            ]);
            const total = yield index_1.Trial.countDocuments({ scout: query.userId });
            return {
                result: {
                    totalPages: Math.ceil(total / limit),
                    currentPage: page,
                    total,
                    trials: trialsWithPendingCount
                }
            };
        });
        this.getSingleTrial = (query) => __awaiter(this, void 0, void 0, function* () {
            const trial = yield index_1.Trial.findOne({ scout: query.userId, _id: query.trial });
            if (!trial)
                return { errors: [{ message: "Trial not Found" }] };
            const page = parseInt(query.page) || 1; // or get from query params
            const limit = parseInt(query.limit) || 50;
            const skip = (page - 1) * limit;
            const applicant = yield trialApplication_1.TrialApplication.find({ trial: trial._id, status: trialApplication_rseponse_1.TrialApplicationStatus.Pending })
                .skip(skip).limit(limit).sort({ createdAt: -1 })
                .populate({
                path: 'athlete', // Path to populate
                model: 'UserAccount', // Explicitly specifying the model is optional but sometimes necessary
                select: '-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt -accountType'
            });
            const total = yield trialApplication_1.TrialApplication.countDocuments({ trial: trial._id, status: trialApplication_rseponse_1.TrialApplicationStatus.Pending });
            return { result: {
                    trial,
                    totalPages: Math.ceil(total / limit),
                    currentPage: page,
                    total,
                    applicant
                } };
        });
        this.getApplicantOnTrial = (query) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(query.page) || 1; // or get from query params
            const limit = parseInt(query.limit) || 50;
            const skip = (page - 1) * limit;
            const trial = yield index_1.Trial.findOne({ scout: query.userId, _id: query.trial });
            if (!trial)
                return { errors: [{ message: "Trial not Found" }] };
            let Applicants = yield trialApplication_1.TrialApplication.find({ trial: query.trial }).skip(skip).limit(limit).sort({ createdAt: -1 })
                .populate({
                path: 'athlete', // Path to populate
                model: 'UserAccount', // Explicitly specifying the model is optional but sometimes necessary
                select: '-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt -accountType'
            });
            if (query.status) {
                Applicants = yield trialApplication_1.TrialApplication.find({ trial: query.trial, status: query.status }).skip(skip).limit(limit).sort({ createdAt: -1 })
                    .populate({
                    path: 'athlete', // Path to populate
                    model: 'UserAccount', // Explicitly specifying the model is optional but sometimes necessary
                    select: '-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt -accountType'
                });
            }
            const total = yield trialApplication_1.TrialApplication.countDocuments({ trial: query.trial, status: query.status });
            return { result: {
                    trial,
                    totalPages: Math.ceil(total / limit),
                    currentPage: page,
                    total,
                    Applicants
                } };
        });
        this.acceptApplicant = (query) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const trial = yield this._trailModel.checkIfExist({ scout: query.userId, _id: query.trial });
            if (!trial.status)
                return { errors: [{ message: "Trial not Found" }] };
            const checkApplication = yield this._trialApplicationModel.checkIfExist({ trial: query.trial, athlete: query.athleteId });
            if (!checkApplication.status)
                return { errors: [{ message: "This Athlete have not applied for this trial " }] };
            const acceptApplicant = yield this._trialApplicationModel.update((_a = checkApplication.data) === null || _a === void 0 ? void 0 : _a._id, { status: trialApplication_rseponse_1.TrialApplicationStatus.Accepted });
            if (!acceptApplicant.status)
                return { errors: [{ message: "Unable to accept application" }] };
            yield this._notificationModel.create({
                user: query.athleteId,
                title: `Your application for ${(_b = trial.data) === null || _b === void 0 ? void 0 : _b.name} has been accepted`,
                description: `Congratulation! You application for the ${(_c = trial.data) === null || _c === void 0 ? void 0 : _c.name} on ${(_d = trial.data) === null || _d === void 0 ? void 0 : _d.trialDate}, has been accepted. Please check your email for further details and preparation guidelines.`
            });
            return { result: { trial: (_e = trial.data) === null || _e === void 0 ? void 0 : _e.getModel, application: (_f = checkApplication.data) === null || _f === void 0 ? void 0 : _f.getModel } };
        });
        this.rejectApplicant = (query) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e, _f;
            const trial = yield this._trailModel.checkIfExist({ scout: query.userId, _id: query.trial });
            if (!trial.status)
                return { errors: [{ message: "Trial not Found" }] };
            const checkApplication = yield this._trialApplicationModel.checkIfExist({ trial: query.trial, athlete: query.athleteId });
            if (!checkApplication.status)
                return { errors: [{ message: "This Athlete have not applied for this trial " }] };
            const rejectApplicant = yield this._trialApplicationModel.update((_a = checkApplication.data) === null || _a === void 0 ? void 0 : _a._id, { status: trialApplication_rseponse_1.TrialApplicationStatus.Rejected });
            if (!rejectApplicant.status)
                return { errors: [{ message: "Unable to reject application" }] };
            yield this._notificationModel.create({
                user: query.athleteId,
                title: `Your application for ${(_b = trial.data) === null || _b === void 0 ? void 0 : _b.name} was rejected`,
                description: `Sorry! You application for the ${(_c = trial.data) === null || _c === void 0 ? void 0 : _c.name} on ${(_d = trial.data) === null || _d === void 0 ? void 0 : _d.trialDate}, has been rejected. Please check your email for further Info.`
            });
            return { result: { trial: (_e = trial.data) === null || _e === void 0 ? void 0 : _e.getModel, application: (_f = checkApplication.data) === null || _f === void 0 ? void 0 : _f.getModel } };
        });
        this.getAthleteProfile = (query) => __awaiter(this, void 0, void 0, function* () {
            const athlete = yield auth_1.UserAccount.findOne({ _id: query.athlete })
                .select('-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt -accountType');
            if (!athlete)
                return { errors: [{ message: "Athlete not Found" }] };
            return { result: { athlete: athlete } };
        });
        this._trailModel = trailModel;
        this._trialApplicationModel = trialApplicationModel;
        this._notificationModel = notificationModel;
    }
}
exports.default = TrialService;
