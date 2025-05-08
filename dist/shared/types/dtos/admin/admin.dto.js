"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AdminAccountDto {
    constructor(adminAccount) {
        this.id = adminAccount._id;
        this.email = adminAccount.email;
        this.password = adminAccount.password;
        this.updatedAt = adminAccount.updatedAt;
        this.createdAt = adminAccount.createdAt;
    }
    get getModel() {
        return {
            _id: this.id,
            email: this.email,
            password: this.password,
            updatedAt: this.updatedAt ? new Date(this.updatedAt) : undefined,
            createdAt: this.createdAt ? new Date(this.createdAt) : undefined,
        };
    }
    get getSecureRespons() {
        return {
            _id: this.id,
            email: this.email,
            updatedAt: this.updatedAt ? new Date(this.updatedAt) : undefined,
            createdAt: this.createdAt ? new Date(this.createdAt) : undefined,
        };
    }
}
exports.default = AdminAccountDto;
