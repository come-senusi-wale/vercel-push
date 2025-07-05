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
class AthleteController {
    constructor({ athleteService }) {
        this.getAllAthlete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = req.query;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { result, errors } = yield this._AthleteService.getAllAthlete(Object.assign({}, query));
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
        this.getSingleAthlete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { athleteId } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { result, errors } = yield this._AthleteService.getSingleAthlete({ athlete: athleteId });
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
        this.getAllAthleteByStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = req.query;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { result, errors } = yield this._AthleteService.getAllAthleteByStatus(Object.assign({}, query));
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
        this.search = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = req.query;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { result, errors } = yield this._AthleteService.search(Object.assign({}, query));
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
        this.totalAthletes = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = req.query;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { result, errors } = yield this._AthleteService.totalAthletes();
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
        this.lastMonthPercentReg = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = req.query;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { result, errors } = yield this._AthleteService.lastMonthPercentReg();
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
        this.totalRegPerMonth = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const query = req.query;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { result, errors } = yield this._AthleteService.totalRegPerMonth();
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
        this.changeStatus = (_a, res_1) => __awaiter(this, [_a, res_1], void 0, function* ({ body }, res) {
            const { user, status } = body;
            const { result, errors } = yield this._AthleteService.changeStatus({ user, status });
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
        this._AthleteService = athleteService;
    }
}
exports.default = AthleteController;
