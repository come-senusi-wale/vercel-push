export interface ICreateTrialRequest {
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
    description: string;
    equipmentNeeded: string[]; 
    maximumAttendance?: string;
}

export enum ScoutSearchType {
    Athlete = 'athlete',
    Trial = 'trial',
}