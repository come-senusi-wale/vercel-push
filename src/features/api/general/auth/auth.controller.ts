import { Request, Response } from "express";
import AuthService from "./auth.service";

import { IForgotPasswordRequest, ILoginRequest, IRegistrationRequest, IResendEmailRequest, IResetPasswordRequest, IVerifyEmailRequest, IVerifyPasswordOtpRequest } from "../../../../shared/types/interfaces/requests/athletes/auth.request";

class AuthController {
    private _AuthService: AuthService;
    
    constructor({ authService } : {authService: AuthService, }) {
        this._AuthService = authService;
    }

    public register = async ({body }: { body: IRegistrationRequest }, res: Response)  => {
      const {  password, email, name, accountType } = body;
      const { user, errors } = await this._AuthService.register(email, password, name, accountType);

    if (errors && errors.length > 0) return res.status(401).json({
        error: errors,
        code: 401,
        status: false
      });
  
      if (user === null) return res.status(401).json({
        code: 401,
        status: false
      });
  
      return res.status(201).json({
        data: user,
        code: 201,
        status: true
      });
    }

    public resendEmail = async ({body }: { body: IResendEmailRequest }, res: Response)  => {
        const { email } = body;
        const { user, errors } = await this._AuthService.resendEmail(email,);
  
      if (errors && errors.length > 0) return res.status(401).json({
          error: errors,
          code: 401,
          status: false
        });
    
        if (user === null) return res.status(401).json({
          code: 401,
          status: false
        });
    
        return res.status(201).json({
          data: user,
          code: 201,
          status: true
        });
    }

    public verifyEmail = async ({body }: { body: IVerifyEmailRequest }, res: Response)  => {
        const { email, otp } = body;
        const { user, errors } = await this._AuthService.verifyEmail(email, otp);
  
      if (errors && errors.length > 0) return res.status(401).json({
          error: errors,
          code: 401,
          status: false
        });
    
        if (user === null) return res.status(401).json({
          code: 401,
          status: false
        });
    
        return res.status(201).json({
          data: user,
          code: 201,
          status: true
        });
    }

    public login = async ({body }: { body: ILoginRequest }, res: Response)  => {
        const { email, password } = body;
        const { user, errors } = await this._AuthService.login(email, password);
  
      if (errors && errors.length > 0) return res.status(401).json({
          error: errors,
          code: 401,
          status: false
        });
    
        if (user === null) return res.status(401).json({
          code: 401,
          status: false
        });
    
        return res.status(201).json({
          data: user,
          code: 201,
          status: true
        });
    }

    public forgotPassword = async ({body }: { body: IForgotPasswordRequest }, res: Response)  => {
        const { email } = body;
        const { user, errors } = await this._AuthService.forgotPassword(email);
  
        if (errors && errors.length > 0) return res.status(401).json({
          error: errors,
          code: 401,
          status: false
        });
    
        if (user === null) return res.status(401).json({
          code: 401,
          status: false
        });
    
        return res.status(201).json({
          data: user,
          code: 201,
          status: true
        });
    }

    public verifyPasswordOtp = async ({body }: { body: IVerifyPasswordOtpRequest }, res: Response)  => {
      const { email, otp } = body;
      const { user, errors } = await this._AuthService.verifyPasswordOtp(email, otp);

      if (errors && errors.length > 0) return res.status(401).json({
        error: errors,
        code: 401,
        status: false
      });
  
      if (user === null) return res.status(401).json({
        code: 401,
        status: false
      });
  
      return res.status(201).json({
        data: user,
        code: 201,
        status: true
      });
    }

    public resetPassword = async ({body }: { body: IResetPasswordRequest }, res: Response)  => {
        const { email, password } = body;
        const { user, errors } = await this._AuthService.resetPassword(email, password);
  
      if (errors && errors.length > 0) return res.status(401).json({
          error: errors,
          code: 401,
          status: false
        });
    
        if (user === null) return res.status(401).json({
          code: 401,
          status: false
        });
    
        return res.status(201).json({
          data: user,
          code: 201,
          status: true
        });
    }
}

export default AuthController;