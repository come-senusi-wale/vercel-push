import { Document, Types , Schema} from 'mongoose';

export enum NotificationRecipient {
    All = 'all',
    Athlete = 'athlete',
    Scout = 'scout',
}

export enum NotificationType {
    Now = 'now',
    Schedule = 'schedule',
    Draft = 'draft',
}

export interface INotification {
    _id: string;
    user: Schema.Types.ObjectId | NotificationRecipient;
    title: string;
    description: string;
    seen: boolean;
    type: NotificationType;
    updatedAt?: Date;
    createdAt?: Date;
}