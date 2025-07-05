import { Document, Types } from 'mongoose';
export enum AccountType {
    Athlete = 'Athlete',
    Scout = 'Scout',
}

export enum AccountStatus {
    Active = 'Active',
    Pending = 'Pending',
    Inactive = 'Inactive',
    Suspended = 'Suspended',
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

export interface UserStatistic {
    height?: string;
    weight?: string;
    bodyFat?: string;
    BMI?: string;
    maxHeight?: string;
    v02Max?: string;
    sprintSpeed?: string;
    verticalJump?: string;
    agility?: string;
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
    statistic?: UserStatistic;
    achievement?: Array<UserAchievement>;
    experience?: Array<UserExperience>;
    education?: Array<UserEducation>;

    title?: string;
    sports?: Array<string>;
    lookFor?: Array<string>;

    accountStatus: AccountStatus;

    updatedAt?: Date;
    createdAt?: Date;
}