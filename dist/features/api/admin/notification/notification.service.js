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
const index_1 = require("../../../../shared/services/database/general/notification/index");
const notification_response_1 = require("../../../../shared/types/interfaces/responses/general/notification.response");
class NotificationService {
    constructor({ notificationModel }) {
        this.createNotification = (data) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const notification = yield this._notificationModel.create({
                user: data.user,
                title: data.title,
                description: data.message,
                type: data.type
            });
            if (!notification.status)
                return { errors: [{ message: "Unable to create message" }] };
            return { result: (_a = notification.data) === null || _a === void 0 ? void 0 : _a.getModel };
        });
        this.getAllNotification = (query) => __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(query.page) || 1; // or get from query params
            const limit = parseInt(query.limit) || 50;
            const skip = (page - 1) * limit;
            const notifications = yield index_1.Notification.find({
                user: {
                    $in: [notification_response_1.NotificationRecipient.All, notification_response_1.NotificationRecipient.Scout, notification_response_1.NotificationRecipient.Athlete]
                }
            }).skip(skip).limit(limit).sort({ createdAt: -1 });
            const total = yield index_1.Notification.countDocuments({ user: {
                    $in: [notification_response_1.NotificationRecipient.All, notification_response_1.NotificationRecipient.Scout, notification_response_1.NotificationRecipient.Athlete]
                } });
            return { result: {
                    totalPages: Math.ceil(total / limit),
                    currentPage: page,
                    total,
                    notifications
                } };
        });
        this.getSingleNotification = (query) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const notification = yield this._notificationModel.checkIfExist({ _id: query.notification });
            if (!notification.status)
                return { errors: [{ message: notification.error }] };
            return { result: (_a = notification.data) === null || _a === void 0 ? void 0 : _a.getModel };
        });
        this.totalSent = () => __awaiter(this, void 0, void 0, function* () {
            const total = yield index_1.Notification.countDocuments({ user: {
                    $in: [notification_response_1.NotificationRecipient.All, notification_response_1.NotificationRecipient.Scout, notification_response_1.NotificationRecipient.Athlete]
                },
                type: notification_response_1.NotificationType.Now
            });
            return { result: {
                    total,
                } };
        });
        this.totalSchedule = () => __awaiter(this, void 0, void 0, function* () {
            const total = yield index_1.Notification.countDocuments({ user: {
                    $in: [notification_response_1.NotificationRecipient.All, notification_response_1.NotificationRecipient.Scout, notification_response_1.NotificationRecipient.Athlete]
                },
                type: notification_response_1.NotificationType.Schedule
            });
            return { result: {
                    total,
                } };
        });
        this._notificationModel = notificationModel;
    }
}
exports.default = NotificationService;
