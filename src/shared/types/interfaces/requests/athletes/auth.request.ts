import { AccountType } from "../../responses/athletes/athlete.response";

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

export interface IResetPasswordRequest {
    email: string;
    otp: string;
    password: string;
}