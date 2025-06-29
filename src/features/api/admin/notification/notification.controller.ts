import { Request, Response } from "express";
import NotificationService from "./notification.service";
import { ICreateNotificationRequest } from "../../../../shared/types/interfaces/requests/admin/notification.request";

class NotificationController {
  private _notificationService: NotificationService;
  
  constructor({ notificationService } : {notificationService: NotificationService, }) {
    this._notificationService = notificationService;
  }

  public createNotification = async (req: Request, res: Response)  => {
    const body: ICreateNotificationRequest = req.body;
 
    const { result, errors } = await this._notificationService.createNotification(body);

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


  public getAllNotification = async (req: Request, res: Response)  => {
    const {page, limit, user,} = req.query;
    const { result, errors } = await this._notificationService.getAllNotification({page, limit, user});

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
    const { result, errors } = await this._notificationService.getSingleNotification({notification: notificationId});

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

  public totalSent = async (req: Request, res: Response)  => {
    const { result, errors } = await this._notificationService.totalSent();

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

  public totalSchedule = async (req: Request, res: Response)  => {
    const { result, errors } = await this._notificationService.totalSchedule();

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