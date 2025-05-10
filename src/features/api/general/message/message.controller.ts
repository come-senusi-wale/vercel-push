import { Request, Response } from "express";
import MessageService from "./message.service";

import { IForgotPasswordRequest, ILoginRequest, IRegistrationRequest, IResendEmailRequest, IResetPasswordRequest, IVerifyEmailRequest } from "../../../../shared/types/interfaces/requests/athletes/auth.request";

class MessageController {
    private _MessageService: MessageService;
    
    constructor({ messageService } : {messageService: MessageService, }) {
        this._MessageService = messageService;
    }

    public getChatHistory = async (req: Request, res: Response)  => {
      const { receiver} = req.params;
      const userId = req.user?._id
      const { result, errors } = await this._MessageService.getChatHistory(receiver, userId);

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

    public chatList = async (req: Request, res: Response)  => {
        const userId = req.user?._id
        const { result, errors } = await this._MessageService.chatList(userId);
  
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

export default MessageController;