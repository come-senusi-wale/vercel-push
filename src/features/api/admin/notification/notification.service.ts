import NotificationDto, {MultipleNotificationDto} from "../../../../shared/types/dtos/general/notification.dto";
import INotificationModel from "../../../../shared/services/database/general/notification/type";
import ErrorInterface from "../../../../shared/types/interfaces/responses/error";
import {Notification} from "../../../../shared/services/database/general/notification/index";
import { NotificationRecipient, NotificationType } from "../../../../shared/types/interfaces/responses/general/notification.response";
import { Types } from "mongoose";
import { ICreateNotificationRequest } from "../../../../shared/types/interfaces/requests/admin/notification.request";


class NotificationService {
    private _notificationModel: INotificationModel;
    
    constructor (
      { notificationModel } : {
        notificationModel: INotificationModel;
      }){
        this._notificationModel = notificationModel;
    }

    public createNotification = async (data: ICreateNotificationRequest) : Promise<{ errors?: ErrorInterface[]; result?: MultipleNotificationDto | any }> => {
        const notification = await this._notificationModel.create({
            user: data.user,
            title: data.title,
            description: data.message,
            type: data.type
        })

        if (!notification.status) return { errors: [{message: "Unable to create message"}] };
        
        return { result: notification.data?.getModel };
    }
  
  
    public getAllNotification = async (query: {page: any, limit: any, user: any}) : Promise<{ errors?: ErrorInterface[]; result?: NotificationDto | any }> => {
        const page: number = parseInt(query.page!) || 1; // or get from query params
        const limit: number = parseInt(query.limit!) || 50;
        const skip = (page - 1) * limit;
  
        const notifications = await Notification.find({
          user: {
            $in: [NotificationRecipient.All, NotificationRecipient.Scout, NotificationRecipient.Athlete]
          }
        }).skip(skip).limit(limit).sort({ createdAt: -1 });
        
        const total = await Notification.countDocuments({user: {
            $in: [NotificationRecipient.All, NotificationRecipient.Scout, NotificationRecipient.Athlete]
        }})
        
        return { result: {
          totalPages: Math.ceil(total / limit),
          currentPage: page,
          total,
         notifications
        } };
    }

    public getSingleNotification = async (query: {notification: any,}) : Promise<{ errors?: ErrorInterface[]; result?: NotificationDto | any }> => {
        const notification = await this._notificationModel.checkIfExist({ _id: query.notification })
        if (!notification.status) return { errors: [{message: notification.error}] };
    
         return { result: notification.data?.getModel };
    }


    public totalSent = async () : Promise<{ errors?: ErrorInterface[]; result?: NotificationDto | any }> => {
        const total = await Notification.countDocuments({user: {
                $in: [NotificationRecipient.All, NotificationRecipient.Scout, NotificationRecipient.Athlete]
            },
            type: NotificationType.Now
        })
        
        return { result: {
          total,
        } };
    }

    public totalSchedule = async () : Promise<{ errors?: ErrorInterface[]; result?: NotificationDto | any }> => {
        const total = await Notification.countDocuments({user: {
                $in: [NotificationRecipient.All, NotificationRecipient.Scout, NotificationRecipient.Athlete]
            },
            type: NotificationType.Schedule
        })
        
        return { result: {
          total,
        } };
    }
    
  }
  
  export default NotificationService;