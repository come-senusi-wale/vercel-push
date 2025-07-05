import { Request, Response } from "express";
import AuthService from "./auth.service";
import { IAdminChangeRoleRequest, IAdminChangeStatusRequest, IAdminForgotPasswordRequest, IAdminLoginRequest, IAdminRegistrationRequest, IAdminResendEmailRequest, IAdminResetPasswordRequest, IAdminVerifyEmailRequest, IAdminVerifyPasswordOtpRequest } from "../../../../shared/types/interfaces/requests/admin/auth.request";

class AuthController {
    private _AuthService: AuthService;
    
    constructor({ authService } : {authService: AuthService, }) {
        this._AuthService = authService;
    }

    public create = async ({body }: { body: IAdminRegistrationRequest }, res: Response)  => {
      const {  password, email, name, role } = body;
      const { result, errors } = await this._AuthService.create(email, password, name, role);

      if (errors && errors.length > 0) return res.status(401).json({
        error: errors,
        code: 401,
        status: false
      });
  
      if (result === null) return res.status(401).json({
        code: 401,
        status: false
      });
  
      return res.status(201).json({
        data: result,
        code: 201,
        status: true
      });
    }

    public register = async ({body }: { body: IAdminRegistrationRequest }, res: Response)  => {
      const {  password, email, name, role } = body;
      const { result, errors } = await this._AuthService.register(email, password, name, role);

      if (errors && errors.length > 0) return res.status(401).json({
        error: errors,
        code: 401,
        status: false
      });
  
      if (result === null) return res.status(401).json({
        code: 401,
        status: false
      });
  
      return res.status(201).json({
        data: result,
        code: 201,
        status: true
      });
    }

    public resendEmail = async ({body }: { body: IAdminResendEmailRequest }, res: Response)  => {
        const { email } = body;
        const { result, errors } = await this._AuthService.resendEmail(email,);
  
      if (errors && errors.length > 0) return res.status(401).json({
          error: errors,
          code: 401,
          status: false
        });
    
        if (result === null) return res.status(401).json({
          code: 401,
          status: false
        });
    
        return res.status(201).json({
          data: result,
          code: 201,
          status: true
        });
    }

    public verifyEmail = async ({body }: { body: IAdminVerifyEmailRequest }, res: Response)  => {
        const { email, otp } = body;
        const { result, errors } = await this._AuthService.verifyEmail(email, otp);
  
      if (errors && errors.length > 0) return res.status(401).json({
          error: errors,
          code: 401,
          status: false
        });
    
        if (result === null) return res.status(401).json({
          code: 401,
          status: false
        });
    
        return res.status(201).json({
          data: result,
          code: 201,
          status: true
        });
    }

    public login = async ({body }: { body: IAdminLoginRequest }, res: Response)  => {
        const { email, password } = body;
        const { result, errors } = await this._AuthService.login(email, password);
  
      if (errors && errors.length > 0) return res.status(401).json({
          error: errors,
          code: 401,
          status: false
        });
    
        if (result === null) return res.status(401).json({
          code: 401,
          status: false
        });
    
        return res.status(201).json({
          data: result,
          code: 201,
          status: true
        });
    }

    public forgotPassword = async ({body }: { body: IAdminForgotPasswordRequest }, res: Response)  => {
      const { email } = body;
      const { result, errors } = await this._AuthService.forgotPassword(email);

      if (errors && errors.length > 0) return res.status(401).json({
        error: errors,
        code: 401,
        status: false
      });
  
      if (result === null) return res.status(401).json({
        code: 401,
        status: false
      });
  
      return res.status(201).json({
        data: result,
        code: 201,
        status: true
      });
    }

    public verifyPasswordOtp = async ({body }: { body: IAdminVerifyPasswordOtpRequest }, res: Response)  => {
      const { email, otp } = body;
      const { result, errors } = await this._AuthService.verifyPasswordOtp(email, otp);

      if (errors && errors.length > 0) return res.status(401).json({
        error: errors,
        code: 401,
        status: false
      });
  
      if (result === null) return res.status(401).json({
        code: 401,
        status: false
      });
  
      return res.status(201).json({
        data: result,
        code: 201,
        status: true
      });
    }

    public resetPassword = async ({body }: { body: IAdminResetPasswordRequest }, res: Response)  => {
      const { email, password } = body;
      const { result, errors } = await this._AuthService.resetPassword(email, password);
  
      if (errors && errors.length > 0) return res.status(401).json({
        error: errors,
        code: 401,
        status: false
      });
    
      if (result === null) return res.status(401).json({
        code: 401,
        status: false
      });
  
      return res.status(201).json({
        data: result,
        code: 201,
        status: true
      });
    }

    public getAllAdmin = async (req: Request, res: Response)  => {
      const query: any = req.query;
      const { result, errors } = await this._AuthService.getAllAdmin({...query});
  
      if (errors && errors.length > 0) return res.status(401).json({
        error: errors,
        code: 401,
        status: false
      });
    
      if (result === null) return res.status(401).json({
        code: 401,
        status: false
      });
  
      return res.status(201).json({
        data: result,
        code: 201,
        status: true
      });
    }

    public changeAdminStatus = async ({body }: { body: IAdminChangeStatusRequest }, res: Response)  => {
      const { admin, status } = body;
      const { result, errors } = await this._AuthService.changeAdminStatus({admin, status});
  
      if (errors && errors.length > 0) return res.status(401).json({
        error: errors,
        code: 401,
        status: false
      });
    
      if (result === null) return res.status(401).json({
        code: 401,
        status: false
      });
  
      return res.status(201).json({
        data: result,
        code: 201,
        status: true
      });
    }

    public changeAdminRole = async ({body }: { body: IAdminChangeRoleRequest }, res: Response)  => {
      const { admin, role } = body;
      const { result, errors } = await this._AuthService.changeAdminRole({admin, role});
  
      if (errors && errors.length > 0) return res.status(401).json({
        error: errors,
        code: 401,
        status: false
      });
    
      if (result === null) return res.status(401).json({
        code: 401,
        status: false
      });
  
      return res.status(201).json({
        data: result,
        code: 201,
        status: true
      });
    }
}

export default AuthController;