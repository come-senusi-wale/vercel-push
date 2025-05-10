import { INotification } from "../../../../types/interfaces/responses/general/notification.response";
import NotificationDto, { MultipleNotificationDto } from "../../../../types/dtos/general/notification.dto";

interface INotificationModel {
    create: (details: Partial<INotification>) => Promise<{status: boolean, error?: string | unknown, data?: NotificationDto }>;

    checkIfExist: (details: Partial<INotification>) => Promise<{status: boolean, error?: string | unknown, data?: NotificationDto }>;

    update: (id: string, details: Partial<INotification>) => Promise<{status: boolean, error?: string | unknown, data?: NotificationDto }>;

    getAll: (details : Partial<INotification>, option: { page: number, limit: number }) => Promise<{status: boolean, error?: string | unknown, data?: MultipleNotificationDto }>;

}

export default INotificationModel;