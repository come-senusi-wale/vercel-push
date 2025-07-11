import AuthDto from "../../../../shared/types/dtos/athletes/athlete.dto";
import EncryptionInterface, { TokenType } from "../../../../shared/services/encryption/index";
import IAUthRespository from "../../../../shared/services/database/athletes/auth/type";
import ErrorInterface from "../../../../shared/types/interfaces/responses/error";
import { generateOTP } from "../../../../shared/constant/otp";
import { sendForgotPasswordEmail, sendVerificationEmail } from "../../../../shared/services/email/nodeMailer";
import { checkTime } from "../../../../shared/constant/checkTime";
import { AccountStatus, AccountType } from "../../../../shared/types/interfaces/responses/athletes/athlete.response";
import { generateToken } from "../../../../shared/constant/token";
import { IChangeNotificationAlertRequest, IChangePasswordRequest, UserAlertType } from "../../../../shared/types/interfaces/requests/athletes/auth.request";

const ERROR_TO_SAVE_ADMIN: ErrorInterface = {
    message: 'unable to create admin',
};


class AuthService {
    private _authModel: IAUthRespository;
    private _encryption: EncryptionInterface
    
    constructor (
      { authModel, encryption } : {
        authModel: IAUthRespository;
        encryption: EncryptionInterface;
      }){
        this._authModel = authModel;
        this._encryption = encryption;
    }
  
    public register = async (email: string, password: string, name: string, accountType: AccountType) : Promise<{ errors?: ErrorInterface[]; user?: AuthDto | any }> => {
        const checkEmail = await this._authModel.checkIfExist({email})
        if (checkEmail.status) return { errors: [{message: "Email already exist"}] };

        const hashPassword = this._encryption.encryptPassword(password)

        const emailOtp = generateOTP();

        const createAccount = await this._authModel.createAccountToDB({email, password: hashPassword, name, accountType, emailOtp, emailOtpCreatedAt: new Date()})
        if (!createAccount.status) return { errors: [{message: createAccount.error}] };

        sendVerificationEmail(email, parseFloat(emailOtp))
   
        return { user: createAccount.data?.getSecureResponse };
    }


    public resendEmail = async (email: string) : Promise<{ errors?: ErrorInterface[]; user?: AuthDto | any }> => {
        const checkUser = await this._authModel.checkIfExist({email})
        if (!checkUser.status || !checkUser.data) return { errors: [{message: "Email not found"}] };

        if (checkUser.data?.emailVerified) return { errors: [{message: "Email already verified"}] };

        const emailOtp = generateOTP();

        const updateOtp = await this._authModel.updateAccount(checkUser.data._id, { emailOtp, emailOtpCreatedAt: new Date()})
        if (!updateOtp.status) return { errors: [{message: updateOtp.error}] };

        sendVerificationEmail(email, parseFloat(emailOtp))
   
        return { user: updateOtp.data?.getSecureResponse };
    }


    public verifyEmail = async (email: string, otp: string) : Promise<{ errors?: ErrorInterface[]; user?: AuthDto | any }> => {
        const checkUser = await this._authModel.checkIfExist({email})
        if (!checkUser.status || !checkUser.data) return { errors: [{message: "Account not found"}] };

        if (checkUser.data?.emailVerified) return { errors: [{message: "Email already verified"}] };

        if (checkUser.data.emailOtp != otp) return { errors: [{message: "Incorrect OTP"}] };

        const isOtpExpired = checkTime(checkUser.data.emailOtpCreatedAt!, 15)
        if (isOtpExpired) return { errors: [{message: "OTP has expired"}] };

        const updateOtp = await this._authModel.updateAccount(checkUser.data._id, {emailVerified: true})
        if (!updateOtp.status) return { errors: [{message: updateOtp.error}] };
   
        return { user: updateOtp.data?.getSecureResponse };
    }

    public login = async (email: string, password: string) : Promise<{ errors?: ErrorInterface[]; user?: AuthDto | any }> => {
        const checkUser = await this._authModel.checkIfExist({email})
        if (!checkUser.status || !checkUser.data) return { errors: [{message: "Account not found"}] };

        if (!checkUser.data?.emailVerified) return { errors: [{message: "Email not verified"}] };

        const checkPassword = this._encryption.comparePassword(password, checkUser.data.password)
        if (!checkPassword) return { errors: [{message: "Incorrect credential"}] };

        if (checkUser.data.accountStatus == AccountStatus.Suspended) return { errors: [{message: "Account have been Suspended"}] };

        const token = generateToken({
            id: checkUser.data._id,
            email: checkUser.data.email,
            accountType: checkUser.data.accountType
        })
   
        return { user: { token, user: checkUser.data.getSecureResponse} };
    }


    public forgotPassword = async (email: string) : Promise<{ errors?: ErrorInterface[]; user?: AuthDto | any }> => {
        const checkUser = await this._authModel.checkIfExist({email})
        if (!checkUser.status || !checkUser.data) return { errors: [{message: "Email not found"}] };

        const passwordOtp = generateOTP();

        const updatePasswordOtp = await this._authModel.updateAccount(checkUser.data._id, { passwordOtp, passwordOtpCreatedAt: new Date(), passwordOtpVerified: false, requestForPasswordChange: true})
        if (!updatePasswordOtp.status) return { errors: [{message: updatePasswordOtp.error}] };

        sendForgotPasswordEmail(email, parseFloat(passwordOtp))
   
        return { user: updatePasswordOtp.data?.getSecureResponse };
    }


    public verifyPasswordOtp = async (email: string, otp: string) : Promise<{ errors?: ErrorInterface[]; user?: AuthDto | any }> => {
        const checkUser = await this._authModel.checkIfExist({email})
        if (!checkUser.status || !checkUser.data) return { errors: [{message: "User not found"}] };

        if (!checkUser.data.requestForPasswordChange) return { errors: [{message: "Please request for password change"}] };

        if (checkUser.data.passwordOtp != otp) return { errors: [{message: "Incorrect OTP"}] };

        const isOtpExpired = checkTime(checkUser.data.passwordOtpCreatedAt!, 15)
        if (isOtpExpired) return { errors: [{message: "OTP has expired"}] };

        const verifiedOtp = await this._authModel.updateAccount(checkUser.data._id, { passwordOtpVerified: true})
        if (!verifiedOtp.status) return { errors: [{message: "unable to verify OTP"}] };
   
        return { user: verifiedOtp.data?.getSecureResponse };
    }


    public resetPassword = async (email: string, password: string) : Promise<{ errors?: ErrorInterface[]; user?: AuthDto | any }> => {
        const checkUser = await this._authModel.checkIfExist({email})
        if (!checkUser.status || !checkUser.data) return { errors: [{message: "Account not found"}] };

        if (!checkUser.data.requestForPasswordChange) return { errors: [{message: "Please request for password change"}] };

        if (!checkUser.data.passwordOtpVerified) return { errors: [{message: "OTP not yet verified"}] };

        const hashPassword = this._encryption.encryptPassword(password)

        const changePassword = await this._authModel.updateAccount(checkUser.data._id, {password: hashPassword, passwordOtpVerified: false, requestForPasswordChange: false})
        if (!changePassword.status) return { errors: [{message: changePassword.error}] };
   
        return { user: changePassword.data?.getSecureResponse };
    }


    public changePassword = async (data: {payload: IChangePasswordRequest, user: any}) : Promise<{ errors?: ErrorInterface[]; user?: AuthDto | any }> => {
        const checkUser = await this._authModel.checkIfExist({_id: data.user})
        if (!checkUser.status || !checkUser.data) return { errors: [{message: "Account not found"}] };

        const checkPassword = this._encryption.comparePassword(data.payload.oldPassword, checkUser.data.password)
        if (!checkPassword) return { errors: [{message: "Please provide the correct old password"}] };

        const hashPassword = this._encryption.encryptPassword(data.payload.newPassword)

        const changePassword = await this._authModel.updateAccount(checkUser.data._id, {password: hashPassword, passwordOtpVerified: false, requestForPasswordChange: false})
        if (!changePassword.status) return { errors: [{message: changePassword.error}] };
   
        return { user: changePassword.data?.getSecureResponse };
    }

    public changeNotificationStatus = async (data: {payload: IChangeNotificationAlertRequest, user: any}) : Promise<{ errors?: ErrorInterface[]; user?: AuthDto | any }> => {
        const checkUser = await this._authModel.checkIfExist({_id: data.user})
        if (!checkUser.status || !checkUser.data) return { errors: [{message: "Account not found"}] };

        if (data.payload.alertType == UserAlertType.Email) {
            const notificationStatus = await this._authModel.updateAccount(data.user, {emailNotification: data.payload.status})
            if (!notificationStatus.status) return { errors: [{message: "Unable to change Notification status"}] };
        }else if (data.payload.alertType == UserAlertType.Push) {
            const notificationStatus = await this._authModel.updateAccount(data.user, {pushNotification: data.payload.status})
            if (!notificationStatus.status) return { errors: [{message: "Unable to change Notification status"}] };
        }else if (data.payload.alertType == UserAlertType.Sound) {
            const notificationStatus = await this._authModel.updateAccount(data.user, {soundVibration: data.payload.status})
            if (!notificationStatus.status) return { errors: [{message: "Unable to change Notification status"}] };
        }else{
            return { errors: [{message: "Unable to change Notification status"}] };
        }
   
        return { user: checkUser.data?.getSecureResponse };
    }

    public getProfileCompletionPercentage = async (data: {user: any}) : Promise<{ errors?: ErrorInterface[]; result?: AuthDto | any }> => {
        const checkUser = await this._authModel.checkIfExist({_id: data.user})
        if (!checkUser.status || !checkUser.data) return { errors: [{message: "Account not found"}] };

        let completed = 0;
        const total = 10;

        const user = checkUser.data

        if (user.name) completed++;
        if (user.skill) completed++;
        if (user.position) completed++;
        if (user.location?.country && user.location?.city) completed++;
        if (user.profileImg) completed++;
        if (user.about) completed++;
        if (user.statistic && Object.values(user.statistic).some(val => !!val)) completed++;
        if (user.achievement && user.achievement.length > 0) completed++;
        if (user.experience && user.experience.length > 0) completed++;
        if (user.education && user.education.length > 0) completed++;

   
        return { result: Math.round((completed / total) * 100) };
    }
  
    
  }
  
  export default AuthService;