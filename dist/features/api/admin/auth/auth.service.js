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
const index_1 = require("../../../../shared/services/database/admin/auth/index");
const admin_response_1 = require("../../../../shared/types/interfaces/responses/admin/admin.response");
const otp_1 = require("../../../../shared/constant/otp");
const nodeMailer_1 = require("../../../../shared/services/email/nodeMailer");
const checkTime_1 = require("../../../../shared/constant/checkTime");
const adminToken_1 = require("../../../../shared/constant/adminToken");
const ERROR_TO_SAVE_ADMIN = {
    message: 'unable to create admin',
};
class AuthService {
    constructor({ adminModel, encryption }) {
        this.create = (email, password, name, role) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const checkEmail = yield this._adminModel.checkIfExist({ email, role: admin_response_1.AdminRole.SuperAdmin });
            if (checkEmail.status)
                return { errors: [{ message: "Email already exist" }] };
            const hashPassword = this._encryption.encryptPassword(password);
            const emailOtp = (0, otp_1.generateOTP)();
            const createAccount = yield this._adminModel.createAccountDB({ email, password: hashPassword, name, role: admin_response_1.AdminRole.SuperAdmin, emailOtp, emailOtpCreatedAt: new Date() });
            if (!createAccount.status)
                return { errors: [{ message: createAccount.error }] };
            (0, nodeMailer_1.sendVerificationEmail)(email, parseFloat(emailOtp));
            return { result: (_a = createAccount.data) === null || _a === void 0 ? void 0 : _a.getSecureRespons };
        });
        this.register = (email, password, name, role) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const checkEmail = yield this._adminModel.checkIfExist({ email });
            if (checkEmail.status)
                return { errors: [{ message: "Email already exist" }] };
            const hashPassword = this._encryption.encryptPassword(password);
            const emailOtp = (0, otp_1.generateOTP)();
            const createAccount = yield this._adminModel.createAccountDB({ email, password: hashPassword, name, role, emailOtp, emailOtpCreatedAt: new Date() });
            if (!createAccount.status)
                return { errors: [{ message: createAccount.error }] };
            (0, nodeMailer_1.sendVerificationEmail)(email, parseFloat(emailOtp));
            return { result: (_a = createAccount.data) === null || _a === void 0 ? void 0 : _a.getSecureRespons };
        });
        this.resendEmail = (email) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const checkAdmin = yield this._adminModel.checkIfExist({ email });
            if (!checkAdmin.status || !checkAdmin.data)
                return { errors: [{ message: "Email not found" }] };
            if ((_a = checkAdmin.data) === null || _a === void 0 ? void 0 : _a.emailVerified)
                return { errors: [{ message: "Email already verified" }] };
            const emailOtp = (0, otp_1.generateOTP)();
            const updateOtp = yield this._adminModel.updateAccount(checkAdmin.data.id, { emailOtp, emailOtpCreatedAt: new Date() });
            if (!updateOtp.status)
                return { errors: [{ message: updateOtp.error }] };
            (0, nodeMailer_1.sendVerificationEmail)(email, parseFloat(emailOtp));
            return { result: (_b = updateOtp.data) === null || _b === void 0 ? void 0 : _b.getSecureRespons };
        });
        this.verifyEmail = (email, otp) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            const checkAdmin = yield this._adminModel.checkIfExist({ email });
            if (!checkAdmin.status || !checkAdmin.data)
                return { errors: [{ message: "Account not found" }] };
            if ((_a = checkAdmin.data) === null || _a === void 0 ? void 0 : _a.emailVerified)
                return { errors: [{ message: "Email already verified" }] };
            if (checkAdmin.data.emailOtp != otp)
                return { errors: [{ message: "Incorrect OTP" }] };
            const isOtpExpired = (0, checkTime_1.checkTime)(checkAdmin.data.emailOtpCreatedAt, 15);
            if (isOtpExpired)
                return { errors: [{ message: "OTP has expired" }] };
            const updateOtp = yield this._adminModel.updateAccount(checkAdmin.data.id, { emailVerified: true });
            if (!updateOtp.status)
                return { errors: [{ message: updateOtp.error }] };
            return { result: (_b = updateOtp.data) === null || _b === void 0 ? void 0 : _b.getSecureRespons };
        });
        this.login = (email, password) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const checkAdmin = yield this._adminModel.checkIfExist({ email });
            if (!checkAdmin.status || !checkAdmin.data)
                return { errors: [{ message: "Account not found" }] };
            if (!((_a = checkAdmin.data) === null || _a === void 0 ? void 0 : _a.emailVerified))
                return { errors: [{ message: "Email not verified" }] };
            const checkPassword = this._encryption.comparePassword(password, checkAdmin.data.password);
            if (!checkPassword)
                return { errors: [{ message: "Incorrect credential" }] };
            if (checkAdmin.data.status == admin_response_1.AdminStatus.Suspended)
                return { errors: [{ message: "Account have been Suspended" }] };
            const token = (0, adminToken_1.generateAdminToken)({
                id: checkAdmin.data.id,
                email: checkAdmin.data.email,
                role: checkAdmin.data.role
            });
            return { result: { token, user: checkAdmin.data.getSecureRespons } };
        });
        this.forgotPassword = (email) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const checkAdmin = yield this._adminModel.checkIfExist({ email });
            if (!checkAdmin.status || !checkAdmin.data)
                return { errors: [{ message: "Email not found" }] };
            const passwordOtp = (0, otp_1.generateOTP)();
            const updatePasswordOtp = yield this._adminModel.updateAccount(checkAdmin.data.id, { passwordOtp, passwordOtpCreatedAt: new Date(), passwordOtpVerified: false, requestForPasswordChange: true });
            if (!updatePasswordOtp.status)
                return { errors: [{ message: updatePasswordOtp.error }] };
            (0, nodeMailer_1.sendForgotPasswordEmail)(email, parseFloat(passwordOtp));
            return { result: (_a = updatePasswordOtp.data) === null || _a === void 0 ? void 0 : _a.getSecureRespons };
        });
        this.verifyPasswordOtp = (email, otp) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const checkAdmin = yield this._adminModel.checkIfExist({ email });
            if (!checkAdmin.status || !checkAdmin.data)
                return { errors: [{ message: "Admin not found" }] };
            if (!checkAdmin.data.requestForPasswordChange)
                return { errors: [{ message: "Please request for password change" }] };
            if (checkAdmin.data.passwordOtp != otp)
                return { errors: [{ message: "Incorrect OTP" }] };
            const isOtpExpired = (0, checkTime_1.checkTime)(checkAdmin.data.passwordOtpCreatedAt, 15);
            if (isOtpExpired)
                return { errors: [{ message: "OTP has expired" }] };
            const verifiedOtp = yield this._adminModel.updateAccount(checkAdmin.data.id, { passwordOtpVerified: true });
            if (!verifiedOtp.status)
                return { errors: [{ message: "unable to verify OTP" }] };
            return { result: (_a = verifiedOtp.data) === null || _a === void 0 ? void 0 : _a.getSecureRespons };
        });
        this.resetPassword = (email, password) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const checkAdmin = yield this._adminModel.checkIfExist({ email });
            if (!checkAdmin.status || !checkAdmin.data)
                return { errors: [{ message: "Account not found" }] };
            if (!checkAdmin.data.requestForPasswordChange)
                return { errors: [{ message: "Please request for password change" }] };
            if (!checkAdmin.data.passwordOtpVerified)
                return { errors: [{ message: "OTP not yet verified" }] };
            const hashPassword = this._encryption.encryptPassword(password);
            const changePassword = yield this._adminModel.updateAccount(checkAdmin.data.id, { password: hashPassword, passwordOtpVerified: false, requestForPasswordChange: false });
            if (!changePassword.status)
                return { errors: [{ message: changePassword.error }] };
            return { result: (_a = changePassword.data) === null || _a === void 0 ? void 0 : _a.getSecureRespons };
        });
        this.getAllAdmin = (query) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(query.page) || 1; // or get from query params
            const limit = parseInt(query.limit) || 50;
            const skip = (page - 1) * limit;
            const admins = yield index_1.AdminAccount.find().skip(skip).limit(limit).sort({ createdAt: -1 })
                .select('-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt');
            const total = yield index_1.AdminAccount.countDocuments();
            return { result: {
                    totalPages: Math.ceil(total / limit),
                    currentPage: page,
                    total,
                    admins
                } };
        });
        this.changeAdminStatus = (data) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const checkAdmin = yield this._adminModel.checkIfExist({ _id: data.admin });
            if (!checkAdmin.status || !checkAdmin.data)
                return { errors: [{ message: "Account not found" }] };
            if (checkAdmin.data.role == admin_response_1.AdminRole.SuperAdmin)
                return { errors: [{ message: "You can't change status of this account" }] };
            const changeAdminStatus = yield this._adminModel.updateAccount(checkAdmin.data.id, { status: data.status });
            if (!changeAdminStatus.status)
                return { errors: [{ message: "Unable to change account status" }] };
            return { result: (_a = changeAdminStatus.data) === null || _a === void 0 ? void 0 : _a.getSecureRespons };
        });
        this.changeAdminRole = (data) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const checkAdmin = yield this._adminModel.checkIfExist({ _id: data.admin });
            if (!checkAdmin.status || !checkAdmin.data)
                return { errors: [{ message: "Account not found" }] };
            if (checkAdmin.data.role == admin_response_1.AdminRole.SuperAdmin)
                return { errors: [{ message: "You can't change role of this account" }] };
            if (data.role == admin_response_1.AdminRole.SuperAdmin)
                return { errors: [{ message: "You can't assign this role" }] };
            const changeAdminRole = yield this._adminModel.updateAccount(checkAdmin.data.id, { role: data.role });
            if (!changeAdminRole.status)
                return { errors: [{ message: "Unable to change account role" }] };
            return { result: (_a = changeAdminRole.data) === null || _a === void 0 ? void 0 : _a.getSecureRespons };
        });
        this._adminModel = adminModel;
        this._encryption = encryption;
    }
}
exports.default = AuthService;
