import { Request, Response } from "express";
import AuthService from "./auth.service";

import { IRegistrationRequest } from "../../../../shared/types/interfaces/requests/athletes/auth.request";

class AuthController {
    private _AuthService: AuthService;
    
    constructor({ authService } : {authService: AuthService, }) {
        this._AuthService = authService;
    }

    public registerAdmin = async ({body}: { body: IRegistrationRequest }, res: Response)  => {
    //   const validationErrors = this._userAuthValidator.validateBeforeRegistration({ ...body });
    //   if (validationErrors.length > 0) {
    //     return sendJson(400, {
    //       error: validationErrors,
    //       code: 400,
    //       status: false
    //     });
    //   }
  
      const {  password, email } = body;
      const { athlete, errors } = await this._AuthService.registerAdmin(email, password);
  
    //   if (errors && errors.length > 0) return sendJson(401, {
    //     error: errors,
    //     code: 401,
    //     status: false
    //   });

    if (errors && errors.length > 0) return res.status(401).json({
        error: errors,
        code: 401,
        status: false
      });
  
      if (athlete === null) return res.status(401).json({
        code: 401,
        status: false
      });
  
      return res.status(201).json({
        data: athlete?.getResponse,
        code: 201,
        status: true
      });
    }
}

export default AuthController;