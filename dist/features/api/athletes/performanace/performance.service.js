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
const index_1 = require("../../../../shared/services/database/athletes/performance/index");
const bocket_1 = __importDefault(require("../../../../shared/services/cloudinary/bocket"));
class PerformanceService {
    constructor({ performanceModel }) {
        this.postPerformance = (payload) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!payload.file && !((_a = payload.file) === null || _a === void 0 ? void 0 : _a.buffer))
                return { errors: [{ message: "file is required" }] };
            const uploadResult = yield new Promise((resolve, reject) => {
                const stream = bocket_1.default.uploader.upload_stream({ folder: "my_app_images" }, (error, result) => {
                    if (error || !result)
                        return { errors: [{ message: "unable to upload image" }] };
                    resolve({ url: result.secure_url });
                });
                stream.write(payload.file.buffer);
                stream.end();
            });
            const fileUrl = uploadResult.url;
            const trailPayload = Object.assign({ athlete: payload.userId, image: fileUrl }, payload.performance);
            const performance = yield this._performanceModel.create(trailPayload);
            if (!performance.status)
                return { errors: [{ message: performance.error }] };
            return { result: (_b = performance.data) === null || _b === void 0 ? void 0 : _b.getModel };
        });
        this.getAllPerformance = (query) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(query.page) || 1; // or get from query params
            const limit = parseInt(query.limit) || 50;
            const skip = (page - 1) * limit;
            const performances = yield index_1.Performance.find().skip(skip).limit(limit).sort({ createdAt: -1 })
                .populate({
                path: 'athlete', // Path to populate
                model: 'UserAccount' // Explicitly specifying the model is optional but sometimes necessary
            });
            const total = yield index_1.Performance.countDocuments();
            return { result: {
                    totalPages: Math.ceil(total / limit),
                    currentPage: page,
                    total,
                    performances
                } };
        });
        this.getAllUrPerformance = (query) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(query.page) || 1; // or get from query params
            const limit = parseInt(query.limit) || 50;
            const skip = (page - 1) * limit;
            const performances = yield index_1.Performance.find({ athlete: query.userId }).skip(skip).limit(limit).sort({ createdAt: -1 });
            const total = yield index_1.Performance.countDocuments({ athlete: query.userId });
            return { result: {
                    totalPages: Math.ceil(total / limit),
                    currentPage: page,
                    total,
                    performances
                } };
        });
        this.getSinglePerformance = (query) => __awaiter(this, void 0, void 0, function* () {
            const performance = yield index_1.Performance.findOne({ _id: query.performance });
            if (!performance)
                return { errors: [{ message: "Performance not Found" }] };
            return { result: performance };
        });
        this._performanceModel = performanceModel;
    }
}
exports.default = PerformanceService;
