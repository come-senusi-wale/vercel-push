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
class TrialController {
    constructor({ trialService }) {
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const body = req.body;
            const file = req.file;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { trial, errors } = yield this._TrialService.create(body, file, userId);
            if (errors && errors.length > 0)
                return res.status(401).json({
                    error: errors,
                    code: 401,
                    status: false
                });
            if (trial === null)
                return res.status(401).json({
                    code: 401,
                    status: false
                });
            return res.status(201).json({
                data: trial,
                code: 201,
                status: true
            });
        });
        this.getAllTrial = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = req.query;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { result, errors } = yield this._TrialService.getAllTrial(Object.assign({ userId }, query));
            if (errors && errors.length > 0)
                return res.status(401).json({
                    error: errors,
                    code: 401,
                    status: false
                });
            if (result === null)
                return res.status(401).json({
                    code: 401,
                    status: false
                });
            return res.status(201).json({
                data: result,
                code: 201,
                status: true
            });
        });
        this.getSingleTrial = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { page, limit, trialId } = req.query;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { result, errors } = yield this._TrialService.getSingleTrial({ trial: trialId, userId, page, limit });
            if (errors && errors.length > 0)
                return res.status(401).json({
                    error: errors,
                    code: 401,
                    status: false
                });
            if (result === null)
                return res.status(401).json({
                    code: 401,
                    status: false
                });
            return res.status(201).json({
                data: result,
                code: 201,
                status: true
            });
        });
        this.getApplicantOnTrial = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { page, limit, trialId, status } = req.query;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { result, errors } = yield this._TrialService.getApplicantOnTrial({ trial: trialId, userId, page, limit, status });
            if (errors && errors.length > 0)
                return res.status(401).json({
                    error: errors,
                    code: 401,
                    status: false
                });
            if (result === null)
                return res.status(401).json({
                    code: 401,
                    status: false
                });
            return res.status(201).json({
                data: result,
                code: 201,
                status: true
            });
        });
        this.acceptApplicant = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { trialId, athleteId } = req.body;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { result, errors } = yield this._TrialService.acceptApplicant({ trial: trialId, athleteId: athleteId, userId });
            if (errors && errors.length > 0)
                return res.status(401).json({
                    error: errors,
                    code: 401,
                    status: false
                });
            if (result === null)
                return res.status(401).json({
                    code: 401,
                    status: false
                });
            return res.status(201).json({
                data: result,
                code: 201,
                status: true
            });
        });
        this.rejectApplicant = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { trialId, athleteId } = req.body;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { result, errors } = yield this._TrialService.rejectApplicant({ trial: trialId, athleteId: athleteId, userId });
            if (errors && errors.length > 0)
                return res.status(401).json({
                    error: errors,
                    code: 401,
                    status: false
                });
            if (result === null)
                return res.status(401).json({
                    code: 401,
                    status: false
                });
            return res.status(201).json({
                data: result,
                code: 201,
                status: true
            });
        });
        this.getAthleteProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { athleteId } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { result, errors } = yield this._TrialService.getAthleteProfile({ athlete: athleteId });
            if (errors && errors.length > 0)
                return res.status(401).json({
                    error: errors,
                    code: 401,
                    status: false
                });
            if (result === null)
                return res.status(401).json({
                    code: 401,
                    status: false
                });
            return res.status(201).json({
                data: result,
                code: 201,
                status: true
            });
        });
        this._TrialService = trialService;
    }
}
exports.default = TrialController;
