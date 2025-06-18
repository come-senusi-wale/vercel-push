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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAccount = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const admin_dto_1 = __importDefault(require("../../../../types/dtos/admin/admin.dto"));
const admin_response_1 = require("../../../../types/interfaces/responses/admin/admin.response");
const AdminAccountSchema = new mongoose_1.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
    },
    name: {
        type: String,
    },
    role: {
        type: String,
        enum: Object.values(admin_response_1.AdminRole),
        required: true,
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    emailOtp: {
        type: String
    },
    emailOtpCreatedAt: {
        type: Date
    },
    passwordOtp: {
        type: String
    },
    passwordOtpCreatedAt: {
        type: Date
    },
    passwordOtpVerified: {
        type: Boolean,
        default: false
    },
    requestForPasswordChange: {
        type: Boolean,
        default: false
    },
    updatedAt: {
        type: String
    },
    createdAt: {
        type: String
    },
});
AdminAccountSchema.plugin(mongoose_paginate_v2_1.default);
exports.AdminAccount = (0, mongoose_1.model)("AdminAccount", AdminAccountSchema);
class AdminAccountModel {
    constructor() {
        this.createAccountDB = (details) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.adminAccount.create(details);
                if (data) {
                    return { status: true, data: new admin_dto_1.default(data) };
                }
                else {
                    return { status: false, error: "Couldn't create account" };
                }
            }
            catch (error) {
                return { status: false, error };
            }
        });
        this.checkIfExist = (details) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.adminAccount.findOne(details);
                if (data) {
                    return { status: true, data: new admin_dto_1.default(data) };
                }
                else {
                    return { status: false, error: "no account find" };
                }
            }
            catch (error) {
                return { status: false, error };
            }
        });
        this.updateAccount = (id, details) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.adminAccount.findOneAndUpdate({ _id: id }, details, { new: true });
                if (data) {
                    return { status: true, data: new admin_dto_1.default(data) };
                }
                else {
                    return { status: false, error: "Unable to update Account" };
                }
            }
            catch (error) {
                return { status: false, error };
            }
        });
        this.adminAccount = exports.AdminAccount;
    }
}
exports.default = AdminAccountModel;
