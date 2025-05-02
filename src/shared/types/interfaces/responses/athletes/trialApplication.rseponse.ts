import { Document, Schema, Types } from 'mongoose';
export enum TrialApplicationStatus {
    Pending = 'Pending',
    Accepted = 'Accepted',
    Rejected = 'Rejected'
}
export interface ITrialApplication {
    _id: string;
    trial: Schema.Types.ObjectId;
    athlete: Schema.Types.ObjectId;
    name: string;
    contactInfo: string;
    position: string;
    status: TrialApplicationStatus,
    document: string;
    updatedAt?: Date;
    createdAt?: Date;
}