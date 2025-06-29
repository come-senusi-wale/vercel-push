"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationType = exports.NotificationRecipient = void 0;
var NotificationRecipient;
(function (NotificationRecipient) {
    NotificationRecipient["All"] = "all";
    NotificationRecipient["Athlete"] = "athlete";
    NotificationRecipient["Scout"] = "scout";
})(NotificationRecipient || (exports.NotificationRecipient = NotificationRecipient = {}));
var NotificationType;
(function (NotificationType) {
    NotificationType["Now"] = "now";
    NotificationType["Schedule"] = "schedule";
    NotificationType["Draft"] = "draft";
})(NotificationType || (exports.NotificationType = NotificationType = {}));
