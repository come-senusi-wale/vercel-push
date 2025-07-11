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
        this.allPaginatedTrial = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            const { trials, errors } = yield this._TrialService.allPaginatedTrial({ page: parseFloat(query.page), limit: parseFloat(query.limit) });
            if (errors && errors.length > 0)
                return res.status(401).json({
                    error: errors,
                    code: 401,
                    status: false
                });
            if (trials === null)
                return res.status(401).json({
                    code: 401,
                    status: false
                });
            return res.status(201).json({
                data: trials,
                code: 201,
                status: true
            });
        });
        this.singleTrial = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const param = req.params;
            const { trial, errors } = yield this._TrialService.singleTrial({ trialId: param.trialId });
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
        this.searchTrial = (req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log("query");
            const query = req.query;
            console.log("query", query);
            const { result, errors } = yield this._TrialService.searchTrial(query);
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
        this.applyForTrial = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const body = req.body;
            const file = req.file;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { result, errors } = yield this._TrialService.applyForTrial({ trial: body, userId, file });
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
        this.getUrTrial = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = req.query;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { result, errors } = yield this._TrialService.getUrTrial(Object.assign(Object.assign({}, query), { userId }));
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
        this.getUrSingleTrial = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { trialId } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            console.log("trialId", trialId);
            console.log("userId", userId);
            const { result, errors } = yield this._TrialService.getUrSingleTrial({ trial: trialId, userId });
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
        this.getScoutProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { scoutId } = req.params;
            const { result, errors } = yield this._TrialService.getScoutProfile({ scout: scoutId });
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
