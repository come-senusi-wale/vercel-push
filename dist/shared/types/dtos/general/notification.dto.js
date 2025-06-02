"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultipleNotificationDto = void 0;
class NotificationDto {
    constructor(notification) {
        this._id = notification._id;
        this.user = notification.user;
        this.title = notification.title;
        this.description = notification.description;
        this.seen = notification.seen;
        this.updatedAt = notification.updatedAt;
        this.createdAt = notification.createdAt;
    }
    get getModel() {
        return {
            _id: this._id,
            user: this.user,
            title: this.title,
            description: this.description,
            seen: this.seen,
            updatedAt: this.updatedAt ? new Date(this.updatedAt) : undefined,
            createdAt: this.createdAt ? new Date(this.createdAt) : undefined,
        };
    }
}
class MultipleNotificationDto {
    constructor(multipleNotification) {
        this.notifications = multipleNotification.notifications.map((notification) => new NotificationDto(notification));
        this.totalTrial = multipleNotification.totalTrial;
        this.hasNextPage = multipleNotification.hasNextPage;
    }
    get getResponse() {
        return {
            notifications: this.notifications.map((notification) => notification.getModel),
            totalTrial: this.totalTrial,
            hasNextPage: this.hasNextPage
        };
    }
}
exports.MultipleNotificationDto = MultipleNotificationDto;
exports.default = NotificationDto;
