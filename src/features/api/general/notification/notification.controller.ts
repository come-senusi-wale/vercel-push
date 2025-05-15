import { Request, Response } from "express";
import NotificationService from "./notification.service";

class NotificationController {
  private _notificationService: NotificationService;
  
  constructor({ notificationService } : {notificationService: NotificationService, }) {
    this._notificationService = notificationService;
  }

  public getAllNotification = async (req: Request, res: Response)  => {
    const {page, limit} = req.query;
    const userId = req.user?._id
    const { result, errors } = await this._notificationService.getAllNotification({page, limit, user: userId});

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

  public getSingleNotification = async (req: Request, res: Response)  => {
    const {notificationId} = req.params;
    const userId = req.user?._id
    const { result, errors } = await this._notificationService.getSingleNotification({notification: notificationId, user: userId});

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

  public readAllNotification = async (req: Request, res: Response)  => {
    const userId = req.user?._id
    const { result, errors } = await this._notificationService.readAllNotification({user: userId});

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

  public removeNotification = async (req: Request, res: Response)  => {
    const {notificationId} = req.params;
    const userId = req.user?._id
    const { result, errors } = await this._notificationService.removeNotification({notification: notificationId, user: userId});

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

export default NotificationController;