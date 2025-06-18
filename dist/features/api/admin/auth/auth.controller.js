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
        this.create = (_a, res_1) => __awaiter(this, [_a, res_1], void 0, function* ({ body }, res) {
            const { password, email, name, role } = body;
            const { result, errors } = yield this._AuthService.create(email, password, name, role);
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
        this.register = (_a, res_1) => __awaiter(this, [_a, res_1], void 0, function* ({ body }, res) {
            const { password, email, name, role } = body;
            const { result, errors } = yield this._AuthService.register(email, password, name, role);
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
        this.resendEmail = (_a, res_1) => __awaiter(this, [_a, res_1], void 0, function* ({ body }, res) {
            const { email } = body;
            const { result, errors } = yield this._AuthService.resendEmail(email);
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
        this.verifyEmail = (_a, res_1) => __awaiter(this, [_a, res_1], void 0, function* ({ body }, res) {
            const { email, otp } = body;
            const { result, errors } = yield this._AuthService.verifyEmail(email, otp);
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
        this.login = (_a, res_1) => __awaiter(this, [_a, res_1], void 0, function* ({ body }, res) {
            const { email, password } = body;
            const { result, errors } = yield this._AuthService.login(email, password);
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
        this.forgotPassword = (_a, res_1) => __awaiter(this, [_a, res_1], void 0, function* ({ body }, res) {
            const { email } = body;
            const { result, errors } = yield this._AuthService.forgotPassword(email);
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
        this.verifyPasswordOtp = (_a, res_1) => __awaiter(this, [_a, res_1], void 0, function* ({ body }, res) {
            const { email, otp } = body;
            const { result, errors } = yield this._AuthService.verifyPasswordOtp(email, otp);
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
        this.resetPassword = (_a, res_1) => __awaiter(this, [_a, res_1], void 0, function* ({ body }, res) {
            const { email, password } = body;
            const { result, errors } = yield this._AuthService.resetPassword(email, password);
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
