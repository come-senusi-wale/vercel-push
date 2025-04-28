import { Document, Types } from 'mongoose';

export interface IAthletesAccount {
    _id?: string;
    email: string;
    password: string;
    name: string;
    purchaseHistory: Types.ObjectId[];
    updatedAt?: Date;
    createdAt?: Date;
}