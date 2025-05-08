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
class TrialService {
    constructor({ trailModel }) {
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
            const page = parseInt(query.page) || 1; // or get from query params
            const limit = parseInt(query.limit) || 50;
            const skip = (page - 1) * limit;
            const trials = yield index_1.Trial.find({ scout: query.userId }).skip(skip).limit(limit).sort({ createdAt: -1 });
            const total = yield index_1.Trial.countDocuments({ scout: query.userId });
            return { result: {
                    totalPages: Math.ceil(total / limit),
                    currentPage: page,
                    total,
                    trials
                } };
        });
        this.getSingleTrial = (query) => __awaiter(this, void 0, void 0, function* () {
            const trial = yield index_1.Trial.findOne({ scout: query.userId, _id: query.trial });
            if (!trial)
                return { errors: [{ message: "Trial not Found" }] };
            const applicant = yield trialApplication_1.TrialApplication.find({ trial: trial._id })
                .populate({
                path: 'athlete', // Path to populate
                model: 'UserAccount' // Explicitly specifying the model is optional but sometimes necessary
            });
            return { result: { trial, applicant } };
        });
        this.acceptApplicant = (query) => __awaiter(this, void 0, void 0, function* () {
            return { result: "" };
        });
        this.rejectApplicant = (query) => __awaiter(this, void 0, void 0, function* () {
            return { result: "" };
        });
        this._trailModel = trailModel;
    }
}
exports.default = TrialService;
