import { Document, Types , Schema} from 'mongoose';
export enum TrialStatus {
    Open = 'open',
    Full = 'full',
    Expired = 'expired',
}

export interface ITrial {
    _id: string;
    scout: Schema.Types.ObjectId;
    name: string;
    trialType: string;
    organizerName: string,
    trialDate: Date;
    registrationDeadline: Date;
    location: string,
    eligibility: string,
    skillLevel: string,
    specificRequirement: string,
    trialFees: number;
    free: boolean;
    refoundPolicy: string;
    documentRequirement: string[]; 
    equipmentNeeded: string[]; 
    description: string;
    file?: string;
    maximumAttendance?: string;
    status: TrialStatus;
    updatedAt?: Date;
    createdAt?: Date;
}