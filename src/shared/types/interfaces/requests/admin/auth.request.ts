import { AdminRole, AdminStatus } from "../../responses/admin/admin.response";

export interface IAdminRegistrationRequest {
    name: string;
    email: string;
    password: string;
    role: AdminRole;
}

export interface IAdminLoginRequest {
    email: string;
    password: string;
}

export interface IAdminForgotPasswordRequest {
    email: string;
}

export interface IAdminResendEmailRequest {
    email: string;
}

export interface IAdminVerifyEmailRequest {
    email: string;
    otp: string;
}

export interface IAdminLoginRequest {
    email: string;
    password: string;
}


export interface IAdminVerifyPasswordOtpRequest {
    email: string;
    otp: string;
}

export interface IAdminResetPasswordRequest {
    email: string;
    password: string;
}

export interface IAdminChangeStatusRequest {
    admin: any;
    status: AdminStatus;
}

export interface IAdminChangeRoleRequest {
    admin: any;
    role: AdminRole;
}