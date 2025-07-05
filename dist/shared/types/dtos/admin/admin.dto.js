"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AdminAccountDto {
    constructor(adminAccount) {
        this.id = adminAccount._id;
        this.email = adminAccount.email;
        this.password = adminAccount.password;
        this.name = adminAccount.name;
        this.role = adminAccount.role;
        this.emailOtp = adminAccount.emailOtp;
        this.emailOtpCreatedAt = adminAccount.emailOtpCreatedAt;
        this.emailVerified = adminAccount.emailVerified;
        this.passwordOtp = adminAccount.passwordOtp;
        this.passwordOtpCreatedAt = adminAccount.passwordOtpCreatedAt;
        this.passwordOtpVerified = adminAccount.passwordOtpVerified;
        this.requestForPasswordChange = adminAccount.requestForPasswordChange;
        this.status = adminAccount.status;
        this.updatedAt = adminAccount.updatedAt;
        this.createdAt = adminAccount.createdAt;
    }
    get getModel() {
        return {
            _id: this.id,
            email: this.email,
            password: this.password,
            name: this.name,
            role: this.role,
            emailVerified: this.emailVerified,
            emailOtp: this.emailOtp,
            emailOtpCreatedAt: this.emailOtpCreatedAt,
            passwordOtp: this.passwordOtp,
            passwordOtpCreatedAt: this.passwordOtpCreatedAt,
            passwordOtpVerified: this.passwordOtpVerified,
            requestForPasswordChange: this.requestForPasswordChange,
            status: this.status,
            updatedAt: this.updatedAt ? new Date(this.updatedAt) : undefined,
            createdAt: this.createdAt ? new Date(this.createdAt) : undefined,
        };
    }
    get getSecureRespons() {
        return {
            _id: this.id,
            email: this.email,
            name: this.name,
            role: this.role,
            emailVerified: this.emailVerified,
            emailOtpCreatedAt: this.emailOtpCreatedAt,
            passwordOtpCreatedAt: this.passwordOtpCreatedAt,
            passwordOtpVerified: this.passwordOtpVerified,
            requestForPasswordChange: this.requestForPasswordChange,
            status: this.status,
            updatedAt: this.updatedAt ? new Date(this.updatedAt) : undefined,
            createdAt: this.createdAt ? new Date(this.createdAt) : undefined,
        };
    }
}
exports.default = AdminAccountDto;
