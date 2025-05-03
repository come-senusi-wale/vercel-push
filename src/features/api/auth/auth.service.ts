import AuthDto from "../../../shared/types/dtos/athletes/athlete.dto";
import EncryptionInterface, { TokenType } from "../../../shared/services/encryption/index";
import IAUthRespository from "../../../shared/services/database/athletes/auth/type";
import ErrorInterface from "../../../shared/types/interfaces/responses/error";
import { generateOTP } from "../../../shared/constant/otp";
import { sendForgotPasswordEmail, sendVerificationEmail } from "../../../shared/services/email/nodeMailer";
import { checkTime } from "../../../shared/constant/checkTime";
import { AccountType } from "../../../shared/types/interfaces/responses/athletes/athlete.response";
import { generateToken } from "../../../shared/constant/token";

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
   
        return { user: createAccount.data?.getSecureRespons };
    }


    public resendEmail = async (email: string) : Promise<{ errors?: ErrorInterface[]; user?: AuthDto | any }> => {
        const checkUser = await this._authModel.checkIfExist({email})
        if (!checkUser.status || !checkUser.data) return { errors: [{message: "Email not found"}] };

        if (checkUser.data?.emailVerified) return { errors: [{message: "Email already verified"}] };

        const emailOtp = generateOTP();

        const updateOtp = await this._authModel.updateAccount(checkUser.data._id, { emailOtp, emailOtpCreatedAt: new Date()})
        if (!updateOtp.status) return { errors: [{message: updateOtp.error}] };

        sendVerificationEmail(email, parseFloat(emailOtp))
   
        return { user: updateOtp.data?.getSecureRespons };
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
   
        return { user: updateOtp.data?.getSecureRespons };
    }

    public login = async (email: string, password: string) : Promise<{ errors?: ErrorInterface[]; user?: AuthDto | any }> => {
        const checkUser = await this._authModel.checkIfExist({email})
        if (!checkUser.status || !checkUser.data) return { errors: [{message: "Account not found"}] };

        if (!checkUser.data?.emailVerified) return { errors: [{message: "Email not verified"}] };

        const checkPassword = this._encryption.comparePassword(password, checkUser.data.password)
        if (!checkPassword) return { errors: [{message: "Incorrect credential"}] };

        const token = generateToken({
            id: checkUser.data._id,
            email: checkUser.data.email,
            accountType: checkUser.data.accountType
        })
   
        return { user: { token, user: checkUser.data.getSecureRespons} };
    }


    public forgotPassword = async (email: string) : Promise<{ errors?: ErrorInterface[]; user?: AuthDto | any }> => {
        const checkUser = await this._authModel.checkIfExist({email})
        if (!checkUser.status || !checkUser.data) return { errors: [{message: "Email not found"}] };

        const passwordOtp = generateOTP();

        const updatePasswordOtp = await this._authModel.updateAccount(checkUser.data._id, { passwordOtp, passwordOtpCreatedAt: new Date()})
        if (!updatePasswordOtp.status) return { errors: [{message: updatePasswordOtp.error}] };

        sendForgotPasswordEmail(email, parseFloat(passwordOtp))
   
        return { user: updatePasswordOtp.data?.getSecureRespons };
    }


    public resetPassword = async (email: string, otp: string, password: string) : Promise<{ errors?: ErrorInterface[]; user?: AuthDto | any }> => {
        const checkUser = await this._authModel.checkIfExist({email})
        if (!checkUser.status || !checkUser.data) return { errors: [{message: "Account not found"}] };

        if (checkUser.data.passwordOtp != otp) return { errors: [{message: "Incorrect OTP"}] };

        const isOtpExpired = checkTime(checkUser.data.emailOtpCreatedAt!, 15)
        if (isOtpExpired) return { errors: [{message: "OTP has expired"}] };

        const hashPassword = this._encryption.encryptPassword(password)

        const changePassword = await this._authModel.updateAccount(checkUser.data._id, {password: hashPassword})
        if (!changePassword.status) return { errors: [{message: changePassword.error}] };
   
        return { user: changePassword.data?.getSecureRespons };
    }
  
    
  }
  
  export default AuthService;