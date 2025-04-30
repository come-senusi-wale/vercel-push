import { Document, Types , Schema} from 'mongoose';

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
    updatedAt?: Date;
    createdAt?: Date;
}