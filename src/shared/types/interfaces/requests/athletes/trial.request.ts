export interface ITrialApplicationRequest {
    trial: any;
    name: string;
    contactInfo: string;
    position: string;
}

export enum AthleteSearchType {
    Scout = 'scout',
    Trial = 'trial',
    All = 'all',
}