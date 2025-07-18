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
class AuthController {
    constructor({ authService }) {
        this.register = (_a, res_1) => __awaiter(this, [_a, res_1], void 0, function* ({ body }, res) {
            const { password, email, name, accountType } = body;
            const { user, errors } = yield this._AuthService.register(email, password, name, accountType);
            if (errors && errors.length > 0)
                return res.status(401).json({
                    error: errors,
                    code: 401,
                    status: false
                });
            if (user === null)
                return res.status(401).json({
                    code: 401,
                    status: false
                });
            return res.status(201).json({
                data: user,
                code: 201,
                status: true
            });
        });
        this.resendEmail = (_a, res_1) => __awaiter(this, [_a, res_1], void 0, function* ({ body }, res) {
            const { email } = body;
            const { user, errors } = yield this._AuthService.resendEmail(email);
            if (errors && errors.length > 0)
                return res.status(401).json({
                    error: errors,
                    code: 401,
                    status: false
                });
            if (user === null)
                return res.status(401).json({
                    code: 401,
                    status: false
                });
            return res.status(201).json({
                data: user,
                code: 201,
                status: true
            });
        });
        this.verifyEmail = (_a, res_1) => __awaiter(this, [_a, res_1], void 0, function* ({ body }, res) {
            const { email, otp } = body;
            const { user, errors } = yield this._AuthService.verifyEmail(email, otp);
            if (errors && errors.length > 0)
                return res.status(401).json({
                    error: errors,
                    code: 401,
                    status: false
                });
            if (user === null)
                return res.status(401).json({
                    code: 401,
                    status: false
                });
            return res.status(201).json({
                data: user,
                code: 201,
                status: true
            });
        });
        this.login = (_a, res_1) => __awaiter(this, [_a, res_1], void 0, function* ({ body }, res) {
            const { email, password } = body;
            const { user, errors } = yield this._AuthService.login(email, password);
            if (errors && errors.length > 0)
                return res.status(401).json({
                    error: errors,
                    code: 401,
                    status: false
                });
            if (user === null)
                return res.status(401).json({
                    code: 401,
                    status: false
                });
            return res.status(201).json({
                data: user,
                code: 201,
                status: true
            });
        });
        this.forgotPassword = (_a, res_1) => __awaiter(this, [_a, res_1], void 0, function* ({ body }, res) {
            const { email } = body;
            const { user, errors } = yield this._AuthService.forgotPassword(email);
            if (errors && errors.length > 0)
                return res.status(401).json({
                    error: errors,
                    code: 401,
                    status: false
                });
            if (user === null)
                return res.status(401).json({
                    code: 401,
                    status: false
                });
            return res.status(201).json({
                data: user,
                code: 201,
                status: true
            });
        });
        this.verifyPasswordOtp = (_a, res_1) => __awaiter(this, [_a, res_1], void 0, function* ({ body }, res) {
            const { email, otp } = body;
            const { user, errors } = yield this._AuthService.verifyPasswordOtp(email, otp);
            if (errors && errors.length > 0)
                return res.status(401).json({
                    error: errors,
                    code: 401,
                    status: false
                });
            if (user === null)
                return res.status(401).json({
                    code: 401,
                    status: false
                });
            return res.status(201).json({
                data: user,
                code: 201,
                status: true
            });
        });
        this.resetPassword = (_a, res_1) => __awaiter(this, [_a, res_1], void 0, function* ({ body }, res) {
            const { email, password } = body;
            const { user, errors } = yield this._AuthService.resetPassword(email, password);
            if (errors && errors.length > 0)
                return res.status(401).json({
                    error: errors,
                    code: 401,
                    status: false
                });
            if (user === null)
                return res.status(401).json({
                    code: 401,
                    status: false
                });
            return res.status(201).json({
                data: user,
                code: 201,
                status: true
            });
        });
        this.changePassword = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const body = req.body;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { user, errors } = yield this._AuthService.changePassword({ payload: body, user: userId });
            if (errors && errors.length > 0)
                return res.status(401).json({
                    error: errors,
                    code: 401,
                    status: false
                });
            if (user === null)
                return res.status(401).json({
                    code: 401,
                    status: false
                });
            return res.status(201).json({
                data: user,
                code: 201,
                status: true
            });
        });
        this.changeNotificationStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const body = req.body;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { user, errors } = yield this._AuthService.changeNotificationStatus({ payload: body, user: userId });
            if (errors && errors.length > 0)
                return res.status(401).json({
                    error: errors,
                    code: 401,
                    status: false
                });
            if (user === null)
                return res.status(401).json({
                    code: 401,
                    status: false
                });
            return res.status(201).json({
                data: user,
                code: 201,
                status: true
            });
        });
        this.getProfileCompletionPercentage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { result, errors } = yield this._AuthService.getProfileCompletionPercentage({ user: userId });
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
        this._AuthService = authService;
    }
}
exports.default = AuthController;
