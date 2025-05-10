import { Document, Types , Schema} from 'mongoose';

export interface INotification {
    _id: string;
    user: Schema.Types.ObjectId;
    title: string;
    description: string;
    seen: boolean;
    updatedAt?: Date;
    createdAt?: Date;
}