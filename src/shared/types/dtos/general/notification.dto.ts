import { Schema, Types } from "mongoose";
import { INotification } from "../../interfaces/responses/general/notification.response";

export interface IMultipleNotificationResponse {
  notifications: INotification[];
  totalTrial: number,
  hasNextPage: boolean
}


class NotificationDto implements INotification {
    public _id: string;
    user: Schema.Types.ObjectId;
    title: string;
    description: string;
    seen: boolean;
    public updatedAt?: Date;
    public createdAt?: Date;
    
    constructor(notification: INotification) {
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
        updatedAt: this.updatedAt ? new Date(this.updatedAt): undefined,
        createdAt: this.createdAt ? new Date(this.createdAt): undefined,
      } as INotification
    }
}

export class MultipleNotificationDto implements IMultipleNotificationResponse {
  notifications: NotificationDto[];
  totalTrial: number;
  hasNextPage: boolean;

  constructor (multipleNotification: IMultipleNotificationResponse) {
    this.notifications = multipleNotification.notifications.map((notification) => new NotificationDto(notification));
    this.totalTrial = multipleNotification.totalTrial;
    this.hasNextPage = multipleNotification.hasNextPage;
  }

  get getResponse() {
    return {
      notifications: this.notifications.map((notification) => notification.getModel ),
      totalTrial: this.totalTrial,
      hasNextPage: this.hasNextPage
    } as IMultipleNotificationResponse;
  }
}

export default NotificationDto;