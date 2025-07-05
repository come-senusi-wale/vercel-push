import { Types } from "mongoose";
import { AdminRole, AdminStatus, IAdminAccount } from "../../interfaces/responses/admin/admin.response";


class AdminAccountDto implements IAdminAccount {
    public id?: string;
    public email: string;
    public password: string ;
    public updatedAt?: Date;
    public createdAt?: Date;
    name?: string | undefined;
    role: AdminRole;
    emailOtp?: string | undefined;
    emailOtpCreatedAt?: Date | undefined;
    emailVerified: boolean;
    passwordOtp?: string | undefined;
    passwordOtpCreatedAt?: Date | undefined;
    passwordOtpVerified?: boolean | undefined;
    requestForPasswordChange?: boolean | undefined;
    status: AdminStatus;
    
    constructor(adminAccount: IAdminAccount) {
      this.id = adminAccount._id;
      this.email = adminAccount.email;
      this.password = adminAccount.password;
      this.name = adminAccount.name;
      this.role = adminAccount.role;
      this.emailOtp = adminAccount.emailOtp;
      this.emailOtpCreatedAt = adminAccount.emailOtpCreatedAt;
      this.emailVerified = adminAccount.emailVerified;
      this.passwordOtp = adminAccount.passwordOtp;
      this.passwordOtpCreatedAt = adminAccount.passwordOtpCreatedAt;
      this.passwordOtpVerified = adminAccount.passwordOtpVerified;
      this.requestForPasswordChange = adminAccount.requestForPasswordChange;
      this.status = adminAccount.status;
      this.updatedAt = adminAccount.updatedAt;
      this.createdAt = adminAccount.createdAt;
    }
  
    get getModel() {
      return {
        _id: this.id,
        email: this.email,
        password: this.password,
        name: this.name,
        role: this.role,
        emailVerified: this.emailVerified,
        emailOtp: this.emailOtp,
        emailOtpCreatedAt: this.emailOtpCreatedAt,
        passwordOtp: this.passwordOtp,
        passwordOtpCreatedAt: this.passwordOtpCreatedAt,
        passwordOtpVerified: this.passwordOtpVerified,
        requestForPasswordChange: this.requestForPasswordChange,
        status: this.status,
        updatedAt: this.updatedAt ? new Date(this.updatedAt): undefined,
        createdAt: this.createdAt ? new Date(this.createdAt): undefined,
      } as IAdminAccount
    }

    get getSecureRespons() {
        return {
          _id: this.id,
          email: this.email,
          name: this.name,
          role: this.role,
          emailVerified: this.emailVerified,
          emailOtpCreatedAt: this.emailOtpCreatedAt,
          passwordOtpCreatedAt: this.passwordOtpCreatedAt,
          passwordOtpVerified: this.passwordOtpVerified,
          requestForPasswordChange: this.requestForPasswordChange,
          status: this.status,
          updatedAt: this.updatedAt ? new Date(this.updatedAt): undefined,
          createdAt: this.createdAt ? new Date(this.createdAt): undefined,
        } as IAdminAccount
      }
  
}

export default AdminAccountDto;