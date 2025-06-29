"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.Notification = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const notification_response_1 = require("../../../../types/interfaces/responses/general/notification.response");
const notification_dto_1 = __importStar(require("../../../../types/dtos/general/notification.dto"));
const NotificationSchema = new mongoose_1.Schema({
    // user: {
    //   type: Schema.Types.ObjectId, 
    //   ref: 'UserAccount',
    //   required: true
    // },
    user: {
        type: mongoose_1.Schema.Types.Mixed, // Allows ObjectId or enum string
        required: true,
        validate: {
            validator: function (value) {
                return (mongoose_1.Types.ObjectId.isValid(value) ||
                    Object.values(notification_response_1.NotificationRecipient).includes(value));
            },
            message: "user must be a valid ObjectId or a valid recipient type (all, athlete, scout)"
        }
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    seen: {
        type: Boolean,
        default: false
    },
    type: {
        type: String,
        enum: Object.values(notification_response_1.NotificationType),
        default: notification_response_1.NotificationType.Now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
NotificationSchema.plugin(mongoose_paginate_v2_1.default);
exports.Notification = (0, mongoose_1.model)("Notifications", NotificationSchema);
class NotificationModel {
    constructor() {
        this.create = (details) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.Notification.create(details);
                if (data) {
                    return { status: true, data: new notification_dto_1.default(data) };
                }
                else {
                    return { status: false, error: "Couldn't create notification" };
                }
            }
            catch (error) {
                return { status: false, error };
            }
        });
        this.checkIfExist = (details) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.Notification.findOne(details);
                if (data) {
                    return { status: true, data: new notification_dto_1.default(data) };
                }
                else {
                    return { status: false, error: "No Notification find" };
                }
            }
            catch (error) {
                return { status: false, error };
            }
        });
        this.update = (id, details) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.Notification.findOneAndUpdate({ _id: id }, details, { new: true });
                if (data) {
                    return { status: true, data: new notification_dto_1.default(data) };
                }
                else {
                    return { status: false, error: "Unable to update Notification" };
                }
            }
            catch (error) {
                return { status: false, error };
            }
        });
        this.getAll = (details, option) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.Notification.paginate(details, Object.assign(Object.assign({}, option), { sort: { createdAt: -1 } }));
                if (data) {
                    return { status: true,
                        data: new notification_dto_1.MultipleNotificationDto({
                            notifications: data.docs,
                            totalTrial: data.totalDocs,
                            hasNextPage: data.hasNextPage
                        }) };
                }
                else {
                    return { status: false, error: "Unable to get notifications" };
                }
            }
            catch (error) {
                return { status: false, error };
            }
        });
        this.Notification = exports.Notification;
    }
}
exports.default = NotificationModel;
