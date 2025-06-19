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
const otp_1 = require("../../../../shared/constant/otp");
const nodeMailer_1 = require("../../../../shared/services/email/nodeMailer");
const checkTime_1 = require("../../../../shared/constant/checkTime");
const token_1 = require("../../../../shared/constant/token");
const auth_request_1 = require("../../../../shared/types/interfaces/requests/athletes/auth.request");
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
            return { user: (_a = createAccount.data) === null || _a === void 0 ? void 0 : _a.getSecureResponse };
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
            return { user: (_b = updateOtp.data) === null || _b === void 0 ? void 0 : _b.getSecureResponse };
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
            return { user: (_b = updateOtp.data) === null || _b === void 0 ? void 0 : _b.getSecureResponse };
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
            return { user: { token, user: checkUser.data.getSecureResponse } };
        });
        this.forgotPassword = (email) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const checkUser = yield this._authModel.checkIfExist({ email });
            if (!checkUser.status || !checkUser.data)
                return { errors: [{ message: "Email not found" }] };
            const passwordOtp = (0, otp_1.generateOTP)();
            const updatePasswordOtp = yield this._authModel.updateAccount(checkUser.data._id, { passwordOtp, passwordOtpCreatedAt: new Date(), passwordOtpVerified: false, requestForPasswordChange: true });
            if (!updatePasswordOtp.status)
                return { errors: [{ message: updatePasswordOtp.error }] };
            (0, nodeMailer_1.sendForgotPasswordEmail)(email, parseFloat(passwordOtp));
            return { user: (_a = updatePasswordOtp.data) === null || _a === void 0 ? void 0 : _a.getSecureResponse };
        });
        this.verifyPasswordOtp = (email, otp) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const checkUser = yield this._authModel.checkIfExist({ email });
            if (!checkUser.status || !checkUser.data)
                return { errors: [{ message: "User not found" }] };
            if (!checkUser.data.requestForPasswordChange)
                return { errors: [{ message: "Please request for password change" }] };
            if (checkUser.data.passwordOtp != otp)
                return { errors: [{ message: "Incorrect OTP" }] };
            const isOtpExpired = (0, checkTime_1.checkTime)(checkUser.data.passwordOtpCreatedAt, 15);
            if (isOtpExpired)
                return { errors: [{ message: "OTP has expired" }] };
            const verifiedOtp = yield this._authModel.updateAccount(checkUser.data._id, { passwordOtpVerified: true });
            if (!verifiedOtp.status)
                return { errors: [{ message: "unable to verify OTP" }] };
            return { user: (_a = verifiedOtp.data) === null || _a === void 0 ? void 0 : _a.getSecureResponse };
        });
        this.resetPassword = (email, password) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const checkUser = yield this._authModel.checkIfExist({ email });
            if (!checkUser.status || !checkUser.data)
                return { errors: [{ message: "Account not found" }] };
            if (!checkUser.data.requestForPasswordChange)
                return { errors: [{ message: "Please request for password change" }] };
            if (!checkUser.data.passwordOtpVerified)
                return { errors: [{ message: "OTP not yet verified" }] };
            const hashPassword = this._encryption.encryptPassword(password);
            const changePassword = yield this._authModel.updateAccount(checkUser.data._id, { password: hashPassword, passwordOtpVerified: false, requestForPasswordChange: false });
            if (!changePassword.status)
                return { errors: [{ message: changePassword.error }] };
            return { user: (_a = changePassword.data) === null || _a === void 0 ? void 0 : _a.getSecureResponse };
        });
        this.changePassword = (data) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const checkUser = yield this._authModel.checkIfExist({ _id: data.user });
            if (!checkUser.status || !checkUser.data)
                return { errors: [{ message: "Account not found" }] };
            const checkPassword = this._encryption.comparePassword(data.payload.oldPassword, checkUser.data.password);
            if (!checkPassword)
                return { errors: [{ message: "Please provide the correct old password" }] };
            const hashPassword = this._encryption.encryptPassword(data.payload.newPassword);
            const changePassword = yield this._authModel.updateAccount(checkUser.data._id, { password: hashPassword, passwordOtpVerified: false, requestForPasswordChange: false });
            if (!changePassword.status)
                return { errors: [{ message: changePassword.error }] };
            return { user: (_a = changePassword.data) === null || _a === void 0 ? void 0 : _a.getSecureResponse };
        });
        this.changeNotificationStatus = (data) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const checkUser = yield this._authModel.checkIfExist({ _id: data.user });
            if (!checkUser.status || !checkUser.data)
                return { errors: [{ message: "Account not found" }] };
            if (data.payload.alertType == auth_request_1.UserAlertType.Email) {
                const notificationStatus = yield this._authModel.updateAccount(data.user, { emailNotification: data.payload.status });
                if (!notificationStatus.status)
                    return { errors: [{ message: "Unable to change Notification status" }] };
            }
            else if (data.payload.alertType == auth_request_1.UserAlertType.Push) {
                const notificationStatus = yield this._authModel.updateAccount(data.user, { pushNotification: data.payload.status });
                if (!notificationStatus.status)
                    return { errors: [{ message: "Unable to change Notification status" }] };
            }
            else if (data.payload.alertType == auth_request_1.UserAlertType.Sound) {
                const notificationStatus = yield this._authModel.updateAccount(data.user, { soundVibration: data.payload.status });
                if (!notificationStatus.status)
                    return { errors: [{ message: "Unable to change Notification status" }] };
            }
            else {
                return { errors: [{ message: "Unable to change Notification status" }] };
            }
            return { user: (_a = checkUser.data) === null || _a === void 0 ? void 0 : _a.getSecureResponse };
        });
        this.getProfileCompletionPercentage = (data) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const checkUser = yield this._authModel.checkIfExist({ _id: data.user });
            if (!checkUser.status || !checkUser.data)
                return { errors: [{ message: "Account not found" }] };
            let completed = 0;
            const total = 10;
            const user = checkUser.data;
            if (user.name)
                completed++;
            if (user.skill)
                completed++;
            if (user.position)
                completed++;
            if (((_a = user.location) === null || _a === void 0 ? void 0 : _a.country) && ((_b = user.location) === null || _b === void 0 ? void 0 : _b.city))
                completed++;
            if (user.profileImg)
                completed++;
            if (user.about)
                completed++;
            if (user.statistic && Object.values(user.statistic).some(val => !!val))
                completed++;
            if (user.achievement && user.achievement.length > 0)
                completed++;
            if (user.experience && user.experience.length > 0)
                completed++;
            if (user.education && user.education.length > 0)
                completed++;
            return { result: Math.round((completed / total) * 100) };
        });
        this._authModel = authModel;
        this._encryption = encryption;
    }
}
exports.default = AuthService;
