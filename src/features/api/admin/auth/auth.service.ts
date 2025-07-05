import AdminDto from "../../../../shared/types/dtos/admin/admin.dto";
import IAdminModelRepository from "../../../../shared/services/database/admin/auth/type";
import { AdminAccount } from "../../../../shared/services/database/admin/auth/index";
import ErrorInterface from "../../../../shared/types/interfaces/responses/error";
import { AdminRole, AdminStatus } from "../../../../shared/types/interfaces/responses/admin/admin.response";
import EncryptionInterface, { TokenType } from "../../../../shared/services/encryption/index";
import { generateOTP } from "../../../../shared/constant/otp";
import { sendForgotPasswordEmail, sendVerificationEmail } from "../../../../shared/services/email/nodeMailer";
import { checkTime } from "../../../../shared/constant/checkTime";
import { generateAdminToken } from "../../../../shared/constant/adminToken";
import { IAdminChangeRoleRequest, IAdminChangeStatusRequest } from "../../../../shared/types/interfaces/requests/admin/auth.request";

const ERROR_TO_SAVE_ADMIN: ErrorInterface = {
    message: 'unable to create admin',
};


class AuthService {
    private _adminModel: IAdminModelRepository;
    private _encryption: EncryptionInterface
    
    constructor (
      { adminModel, encryption } : {
        adminModel: IAdminModelRepository;
        encryption: EncryptionInterface;
      }){
        this._adminModel = adminModel;
        this._encryption = encryption;
    }
  
    public create = async (email: string, password: string, name: string, role: AdminRole) : Promise<{ errors?: ErrorInterface[]; result?: AdminDto | any }> => {
      const checkEmail = await this._adminModel.checkIfExist({email, role: AdminRole.SuperAdmin})
      if (checkEmail.status) return { errors: [{message: "Email already exist"}] };

      const hashPassword = this._encryption.encryptPassword(password)

      const emailOtp = generateOTP();

      const createAccount = await this._adminModel.createAccountDB({email, password: hashPassword, name, role: AdminRole.SuperAdmin, emailOtp, emailOtpCreatedAt: new Date()})
      if (!createAccount.status) return { errors: [{message: createAccount.error}] };

      sendVerificationEmail(email, parseFloat(emailOtp))
 
      return { result: createAccount.data?.getSecureRespons };
    }

    public register = async (email: string, password: string, name: string, role: AdminRole) : Promise<{ errors?: ErrorInterface[]; result?: AdminDto | any }> => {
      const checkEmail = await this._adminModel.checkIfExist({email})
      if (checkEmail.status) return { errors: [{message: "Email already exist"}] };

      const hashPassword = this._encryption.encryptPassword(password)

      const emailOtp = generateOTP();

      const createAccount = await this._adminModel.createAccountDB({email, password: hashPassword, name, role, emailOtp, emailOtpCreatedAt: new Date()})
      if (!createAccount.status) return { errors: [{message: createAccount.error}] };

      sendVerificationEmail(email, parseFloat(emailOtp))
 
      return { result: createAccount.data?.getSecureRespons };
    }


    public resendEmail = async (email: string) : Promise<{ errors?: ErrorInterface[]; result?: AdminDto | any }> => {
      const checkAdmin = await this._adminModel.checkIfExist({email})
      if (!checkAdmin.status || !checkAdmin.data) return { errors: [{message: "Email not found"}] };

      if (checkAdmin.data?.emailVerified) return { errors: [{message: "Email already verified"}] };

      const emailOtp = generateOTP();

      const updateOtp = await this._adminModel.updateAccount(checkAdmin.data.id!, { emailOtp, emailOtpCreatedAt: new Date()})
      if (!updateOtp.status) return { errors: [{message: updateOtp.error}] };

      sendVerificationEmail(email, parseFloat(emailOtp))
 
      return { result: updateOtp.data?.getSecureRespons };
    }


    public verifyEmail = async (email: string, otp: string) : Promise<{ errors?: ErrorInterface[]; result?: AdminDto | any }> => {
      const checkAdmin = await this._adminModel.checkIfExist({email})
      if (!checkAdmin.status || !checkAdmin.data) return { errors: [{message: "Account not found"}] };

      if (checkAdmin.data?.emailVerified) return { errors: [{message: "Email already verified"}] };

      if (checkAdmin.data.emailOtp != otp) return { errors: [{message: "Incorrect OTP"}] };

      const isOtpExpired = checkTime(checkAdmin.data.emailOtpCreatedAt!, 15)
      if (isOtpExpired) return { errors: [{message: "OTP has expired"}] };

      const updateOtp = await this._adminModel.updateAccount(checkAdmin.data.id!, {emailVerified: true})
      if (!updateOtp.status) return { errors: [{message: updateOtp.error}] };
 
      return { result: updateOtp.data?.getSecureRespons };
    }

    public login = async (email: string, password: string) : Promise<{ errors?: ErrorInterface[]; result?: AdminDto | any }> => {
      const checkAdmin = await this._adminModel.checkIfExist({email})
      if (!checkAdmin.status || !checkAdmin.data) return { errors: [{message: "Account not found"}] };

      if (!checkAdmin.data?.emailVerified) return { errors: [{message: "Email not verified"}] };

      const checkPassword = this._encryption.comparePassword(password, checkAdmin.data.password)
      if (!checkPassword) return { errors: [{message: "Incorrect credential"}] };
      
      if (checkAdmin.data.status == AdminStatus.Suspended) return { errors: [{message: "Account have been Suspended"}] };

      const token = generateAdminToken({
          id: checkAdmin.data.id!,
          email: checkAdmin.data.email,
          role: checkAdmin.data.role
      })
 
      return { result: { token, user: checkAdmin.data.getSecureRespons} };
    }


    public forgotPassword = async (email: string) : Promise<{ errors?: ErrorInterface[]; result?: AdminDto | any }> => {
      const checkAdmin = await this._adminModel.checkIfExist({email})
      if (!checkAdmin.status || !checkAdmin.data) return { errors: [{message: "Email not found"}] };

      const passwordOtp = generateOTP();

      const updatePasswordOtp = await this._adminModel.updateAccount(checkAdmin.data.id!, { passwordOtp, passwordOtpCreatedAt: new Date(), passwordOtpVerified: false, requestForPasswordChange: true})
      if (!updatePasswordOtp.status) return { errors: [{message: updatePasswordOtp.error}] };

      sendForgotPasswordEmail(email, parseFloat(passwordOtp))
 
      return { result: updatePasswordOtp.data?.getSecureRespons };
    }


    public verifyPasswordOtp = async (email: string, otp: string) : Promise<{ errors?: ErrorInterface[]; result?: AdminDto | any }> => {
      const checkAdmin = await this._adminModel.checkIfExist({email})
      if (!checkAdmin.status || !checkAdmin.data) return { errors: [{message: "Admin not found"}] };

      if (!checkAdmin.data.requestForPasswordChange) return { errors: [{message: "Please request for password change"}] };

      if (checkAdmin.data.passwordOtp != otp) return { errors: [{message: "Incorrect OTP"}] };

      const isOtpExpired = checkTime(checkAdmin.data.passwordOtpCreatedAt!, 15)
      if (isOtpExpired) return { errors: [{message: "OTP has expired"}] };

      const verifiedOtp = await this._adminModel.updateAccount(checkAdmin.data.id!, { passwordOtpVerified: true})
      if (!verifiedOtp.status) return { errors: [{message: "unable to verify OTP"}] };
 
      return { result: verifiedOtp.data?.getSecureRespons };
    }


    public resetPassword = async (email: string, password: string) : Promise<{ errors?: ErrorInterface[]; result?: AdminDto | any }> => {
      const checkAdmin = await this._adminModel.checkIfExist({email})
      if (!checkAdmin.status || !checkAdmin.data) return { errors: [{message: "Account not found"}] };

      if (!checkAdmin.data.requestForPasswordChange) return { errors: [{message: "Please request for password change"}] };

      if (!checkAdmin.data.passwordOtpVerified) return { errors: [{message: "OTP not yet verified"}] };

      const hashPassword = this._encryption.encryptPassword(password)

      const changePassword = await this._adminModel.updateAccount(checkAdmin.data.id!, {password: hashPassword, passwordOtpVerified: false, requestForPasswordChange: false})
      if (!changePassword.status) return { errors: [{message: changePassword.error}] };
 
      return { result: changePassword.data?.getSecureRespons };
    }

    public getAllAdmin = async (query: { page?: string, limit?: string}) : Promise<{ errors?: ErrorInterface[]; result?: AdminDto | any }> => {
      const page: number = parseInt(query.page!) || 1; // or get from query params
      const limit: number = parseInt(query.limit!) || 50;
      const skip = (page - 1) * limit;

      const admins = await AdminAccount.find().skip(skip).limit(limit).sort({createdAt: -1})
      .select('-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt')
    
      const total = await AdminAccount.countDocuments()
        
      return { result: {
          totalPages: Math.ceil(total / limit),
          currentPage: page,
          total,
          admins
      } };

  }

    public changeAdminStatus = async (data: IAdminChangeStatusRequest) : Promise<{ errors?: ErrorInterface[]; result?: AdminDto | any }> => {
      const checkAdmin = await this._adminModel.checkIfExist({_id: data.admin})
      if (!checkAdmin.status || !checkAdmin.data) return { errors: [{message: "Account not found"}] };

      if (checkAdmin.data.role == AdminRole.SuperAdmin) return { errors: [{message: "You can't change status of this account"}] };

      const changeAdminStatus = await this._adminModel.updateAccount(checkAdmin.data.id!, { status: data.status})
      if (!changeAdminStatus.status) return { errors: [{message: "Unable to change account status"}] };
 
      return { result: changeAdminStatus.data?.getSecureRespons };
    }

    public changeAdminRole = async (data: IAdminChangeRoleRequest) : Promise<{ errors?: ErrorInterface[]; result?: AdminDto | any }> => {
      const checkAdmin = await this._adminModel.checkIfExist({_id: data.admin})
      if (!checkAdmin.status || !checkAdmin.data) return { errors: [{message: "Account not found"}] };

      if (checkAdmin.data.role == AdminRole.SuperAdmin) return { errors: [{message: "You can't change role of this account"}] };

      if (data.role == AdminRole.SuperAdmin) return { errors: [{message: "You can't assign this role"}] };

      const changeAdminRole = await this._adminModel.updateAccount(checkAdmin.data.id!, { role: data.role})
      if (!changeAdminRole.status) return { errors: [{message: "Unable to change account role"}] };
 
      return { result: changeAdminRole.data?.getSecureRespons };
    }

}
  
export default AuthService;