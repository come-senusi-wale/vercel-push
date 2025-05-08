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
        this.registerAdmin = (_a, res_1) => __awaiter(this, [_a, res_1], void 0, function* ({ body }, res) {
            //   const validationErrors = this._userAuthValidator.validateBeforeRegistration({ ...body });
            //   if (validationErrors.length > 0) {
            //     return sendJson(400, {
            //       error: validationErrors,
            //       code: 400,
            //       status: false
            //     });
            //   }
            const { password, email } = body;
            const { admin, errors } = yield this._AuthService.registerAdmin(email, password);
            //   if (errors && errors.length > 0) return sendJson(401, {
            //     error: errors,
            //     code: 401,
            //     status: false
            //   });
            if (errors && errors.length > 0)
                return res.status(401).json({
                    error: errors,
                    code: 401,
                    status: false
                });
            if (admin === null)
                return res.status(401).json({
                    code: 401,
                    status: false
                });
            return res.status(201).json({
                data: admin === null || admin === void 0 ? void 0 : admin.getResponse,
                code: 201,
                status: true
            });
        });
        this._AuthService = authService;
    }
}
exports.default = AuthController;
