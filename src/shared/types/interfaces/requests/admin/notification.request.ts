import { NotificationRecipient, NotificationType } from "../../responses/general/notification.response";

export interface ICreateNotificationRequest {
    user: NotificationRecipient;
    title: string;
    message: string;
    type: NotificationType;
}