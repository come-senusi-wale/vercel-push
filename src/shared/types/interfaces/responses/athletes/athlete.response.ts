import { Document, Types } from 'mongoose';
export enum AccountType {
    Athlete = 'Athlete',
    Scout = 'Scout',
}

export interface UserLocation {
    country: string;
    city: string;
}

export interface UserAchievement {
    title: string;
    date: Date;
    sport: string;
    description: string;
} 

export interface UserExperience {
    title: string;
    date: Date;
    sport: string;
    description: string;
}

export interface UserEducation {
    school: string;
    degree: string;
    field: string;
    startDate: Date;
    endDate: Date | string;
    description?: string;
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
    passwordOtpVerified?: boolean;
    requestForPasswordChange?: boolean;
    pushNotification: boolean;
    emailNotification: boolean,
    soundVibration: boolean,

    skill?: string;
    position?: string;
    location?: UserLocation;
    profileImg?: string;
    about?: string;
    cgp?: string[];
    achievement?: Array<UserAchievement>;
    experience?: Array<UserExperience>;
    education?: Array<UserEducation>;

    updatedAt?: Date;
    createdAt?: Date;
}