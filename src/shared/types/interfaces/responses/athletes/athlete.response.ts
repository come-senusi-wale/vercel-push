import { Document, Types } from 'mongoose';
export enum AccountType {
    Athlete = 'Athlete',
    Scout = 'Scout',
}
export interface IAthletesAccount {
    _id: string;
    email: string;
    password: string;
    accountType: AccountType,
    name?: string;
    emailVerified: boolean;
    emailOtp?: string;
    emailOtpCreatedAt?: Date;
    passwordOtp?: string;
    passwordOtpCreatedAt?: Date;
    pushNotification: boolean;
    emailNotification: boolean,
    soundVibration: boolean,
    updatedAt?: Date;
    createdAt?: Date;
}