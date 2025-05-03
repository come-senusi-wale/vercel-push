import { Document, Schema, Types } from 'mongoose';
export enum PerformanceVisibility {
    Public = 'Public',
    Private = 'Private',
}
export interface IPerformance {
    _id: string;
    athlete: Schema.Types.ObjectId;
    description: string;
    visibility: PerformanceVisibility,
    image: string;
    updatedAt?: Date;
    createdAt?: Date;
}