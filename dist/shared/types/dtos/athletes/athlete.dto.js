"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserAccountDto {
    constructor(userAccount) {
        this._id = userAccount._id;
        this.email = userAccount.email;
        this.password = userAccount.password;
        this.accountType = userAccount.accountType,
            this.name = userAccount.name;
        this.emailVerified = userAccount.emailVerified;
        this.emailOtp = userAccount.emailOtp;
        this.emailOtpCreatedAt = userAccount.emailOtpCreatedAt;
        this.passwordOtp = userAccount.passwordOtp,
            this.passwordOtpCreatedAt = userAccount.passwordOtpCreatedAt,
            this.updatedAt = userAccount.updatedAt;
        this.createdAt = userAccount.createdAt;
    }
    get getModel() {
        return {
            _id: this._id,
            email: this.email,
            password: this.password,
            accountType: this.accountType,
            name: this.name,
            emailVerified: this.emailVerified,
            emailOtp: this.emailOtp,
            emailOtpCreatedAt: this.emailOtpCreatedAt,
            passwordOtp: this.passwordOtp,
            passwordOtpCreatedAt: this.passwordOtpCreatedAt,
            updatedAt: this.updatedAt ? new Date(this.updatedAt) : undefined,
            createdAt: this.createdAt ? new Date(this.createdAt) : undefined,
        };
    }
    get getSecureRespons() {
        return {
            _id: this._id,
            email: this.email,
            name: this.name,
            accountType: this.accountType,
            emailVerified: this.emailVerified,
            updatedAt: this.updatedAt ? new Date(this.updatedAt) : undefined,
            createdAt: this.createdAt ? new Date(this.createdAt) : undefined,
        };
    }
}
exports.default = UserAccountDto;
