
export enum AdminRole {
    SuperAdmin = 'Super Admin',
    ContentManager = 'Content Manager',
    SupportAgent = 'Support Agent'
}

export enum AdminStatus {
    Active = 'active',
    Suspended = 'suspended',
}

export interface IAdminAccount {
    _id?: string;
    email: string;
    password: string;
    role: AdminRole,
    name?: string;
    emailVerified: boolean;
    emailOtp?: string;
    emailOtpCreatedAt?: Date;
    passwordOtp?: string;
    passwordOtpCreatedAt?: Date;
    passwordOtpVerified?: boolean;
    requestForPasswordChange?: boolean;
    status: AdminStatus;
    updatedAt?: Date;
    createdAt?: Date;
}