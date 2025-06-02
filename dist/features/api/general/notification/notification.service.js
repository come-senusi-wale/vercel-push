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
class NotificationService {
    constructor({ notificationModel }) {
        this.getAllNotification = (query) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const notifications = yield this._notificationModel.getAll({ user: query.user }, { page: query.page, limit: query.limit });
            return { result: (_a = notifications.data) === null || _a === void 0 ? void 0 : _a.getResponse };
        });
        this.getSingleNotification = (query) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const notification = yield this._notificationModel.checkIfExist({ _id: query.notification, user: query.user });
            if (!notification.status)
                return { errors: [{ message: notification.error }] };
            // update the notication to seen
            yield this._notificationModel.update(query.notification, { seen: true });
            return { result: (_a = notification.data) === null || _a === void 0 ? void 0 : _a.getModel };
        });
        this.readAllNotification = (query) => __awaiter(this, void 0, void 0, function* () {
            const readNotification = yield index_1.Notification.updateMany({ user: query.user }, { seen: true }, { new: true });
            return { result: readNotification };
        });
        this.removeNotification = (query) => __awaiter(this, void 0, void 0, function* () {
            const removeNotification = yield index_1.Notification.deleteOne({ _id: query.notification, user: query.user });
            if (!removeNotification)
                return { errors: [{ message: "Unable to remove notification" }] };
            return { result: removeNotification };
        });
        this._notificationModel = notificationModel;
    }
}
exports.default = NotificationService;
