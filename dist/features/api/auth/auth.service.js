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
const otp_1 = require("../../../shared/constant/otp");
const nodeMailer_1 = require("../../../shared/services/email/nodeMailer");
const checkTime_1 = require("../../../shared/constant/checkTime");
const token_1 = require("../../../shared/constant/token");
const ERROR_TO_SAVE_ADMIN = {
    message: 'unable to create admin',
};
class AuthService {
    constructor({ authModel, encryption }) {
        this.register = (email, password, name, accountType) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const checkEmail = yield this._authModel.checkIfExist({ email });
            if (checkEmail.status)
                return { errors: [{ message: "Email already exist" }] };
            const hashPassword = this._encryption.encryptPassword(password);
            const emailOtp = (0, otp_1.generateOTP)();
            const createAccount = yield this._authModel.createAccountToDB({ email, password: hashPassword, name, accountType, emailOtp, emailOtpCreatedAt: new Date() });
            if (!createAccount.status)
                return { errors: [{ message: createAccount.error }] };
            (0, nodeMailer_1.sendVerificationEmail)(email, parseFloat(emailOtp));
            return { user: (_a = createAccount.data) === null || _a === void 0 ? void 0 : _a.getSecureRespons };
        });
        this.resendEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const checkUser = yield this._authModel.checkIfExist({ email });
            if (!checkUser.status || !checkUser.data)
                return { errors: [{ message: "Email not found" }] };
            if ((_a = checkUser.data) === null || _a === void 0 ? void 0 : _a.emailVerified)
                return { errors: [{ message: "Email already verified" }] };
            const emailOtp = (0, otp_1.generateOTP)();
            const updateOtp = yield this._authModel.updateAccount(checkUser.data._id, { emailOtp, emailOtpCreatedAt: new Date() });
            if (!updateOtp.status)
                return { errors: [{ message: updateOtp.error }] };
            (0, nodeMailer_1.sendVerificationEmail)(email, parseFloat(emailOtp));
            return { user: (_b = updateOtp.data) === null || _b === void 0 ? void 0 : _b.getSecureRespons };
        });
        this.verifyEmail = (email, otp) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const checkUser = yield this._authModel.checkIfExist({ email });
            if (!checkUser.status || !checkUser.data)
                return { errors: [{ message: "Account not found" }] };
            if ((_a = checkUser.data) === null || _a === void 0 ? void 0 : _a.emailVerified)
                return { errors: [{ message: "Email already verified" }] };
            if (checkUser.data.emailOtp != otp)
                return { errors: [{ message: "Incorrect OTP" }] };
            const isOtpExpired = (0, checkTime_1.checkTime)(checkUser.data.emailOtpCreatedAt, 15);
            if (isOtpExpired)
                return { errors: [{ message: "OTP has expired" }] };
            const updateOtp = yield this._authModel.updateAccount(checkUser.data._id, { emailVerified: true });
            if (!updateOtp.status)
                return { errors: [{ message: updateOtp.error }] };
            return { user: (_b = updateOtp.data) === null || _b === void 0 ? void 0 : _b.getSecureRespons };
        });
        this.login = (email, password) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const checkUser = yield this._authModel.checkIfExist({ email });
            if (!checkUser.status || !checkUser.data)
                return { errors: [{ message: "Account not found" }] };
            if (!((_a = checkUser.data) === null || _a === void 0 ? void 0 : _a.emailVerified))
                return { errors: [{ message: "Email not verified" }] };
            const checkPassword = this._encryption.comparePassword(password, checkUser.data.password);
            if (!checkPassword)
                return { errors: [{ message: "Incorrect credential" }] };
            const token = (0, token_1.generateToken)({
                id: checkUser.data._id,
                email: checkUser.data.email,
                accountType: checkUser.data.accountType
            });
            return { user: { token, user: checkUser.data.getSecureRespons } };
        });
        this.forgotPassword = (email) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const checkUser = yield this._authModel.checkIfExist({ email });
            if (!checkUser.status || !checkUser.data)
                return { errors: [{ message: "Email not found" }] };
            const passwordOtp = (0, otp_1.generateOTP)();
            const updatePasswordOtp = yield this._authModel.updateAccount(checkUser.data._id, { passwordOtp, passwordOtpCreatedAt: new Date() });
            if (!updatePasswordOtp.status)
                return { errors: [{ message: updatePasswordOtp.error }] };
            (0, nodeMailer_1.sendForgotPasswordEmail)(email, parseFloat(passwordOtp));
            return { user: (_a = updatePasswordOtp.data) === null || _a === void 0 ? void 0 : _a.getSecureRespons };
        });
        this.resetPassword = (email, otp, password) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const checkUser = yield this._authModel.checkIfExist({ email });
            if (!checkUser.status || !checkUser.data)
                return { errors: [{ message: "Account not found" }] };
            if (checkUser.data.passwordOtp != otp)
                return { errors: [{ message: "Incorrect OTP" }] };
            const isOtpExpired = (0, checkTime_1.checkTime)(checkUser.data.emailOtpCreatedAt, 15);
            if (isOtpExpired)
                return { errors: [{ message: "OTP has expired" }] };
            const hashPassword = this._encryption.encryptPassword(password);
            const changePassword = yield this._authModel.updateAccount(checkUser.data._id, { password: hashPassword });
            if (!changePassword.status)
                return { errors: [{ message: changePassword.error }] };
            return { user: (_a = changePassword.data) === null || _a === void 0 ? void 0 : _a.getSecureRespons };
        });
        this._authModel = authModel;
        this._encryption = encryption;
    }
}
exports.default = AuthService;
