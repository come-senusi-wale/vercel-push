import { AccountStatus, AccountType } from "../../responses/athletes/athlete.response";

export interface IRegistrationRequest {
    email: string;
    password: string;
    name: string;
    accountType: AccountType
}

export interface IResendEmailRequest {
    email: string;
}

export interface IVerifyEmailRequest {
    email: string;
    otp: string;
}

export interface ILoginRequest {
    email: string;
    password: string;
}

export interface IForgotPasswordRequest {
    email: string;
}

export interface IVerifyPasswordOtpRequest {
    email: string;
    otp: string;
}

export interface IResetPasswordRequest {
    email: string;
    password: string;
}

export interface IChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
}

export enum UserAlertType {
    Push = 'push',
    Email = 'email',
    Sound = 'sound'
}

export interface IChangeNotificationAlertRequest {
    alertType: UserAlertType;
    status: boolean;
}

export interface IChangeStatusRequest {
    user: string;
    status: AccountStatus;
}