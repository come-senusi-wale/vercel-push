import NotificationDto, {MultipleNotificationDto} from "../../../../shared/types/dtos/general/notification.dto";
import INotificationModel from "../../../../shared/services/database/general/notification/type";
import ErrorInterface from "../../../../shared/types/interfaces/responses/error";
import {Notification} from "../../../../shared/services/database/general/notification/index";


class NotificationService {
    private _notificationModel: INotificationModel;
    
    constructor (
      { notificationModel } : {
        notificationModel: INotificationModel;
      }){
        this._notificationModel = notificationModel;
    }
  
    public getAllNotification = async (query: {page: any, limit: any, user: any}) : Promise<{ errors?: ErrorInterface[]; result?: MultipleNotificationDto | any }> => {
       const notifications = await this._notificationModel.getAll({user: query.user}, {page: query.page, limit: query.limit})
   
        return { result: notifications.data?.getResponse };
    }

    public getSingleNotification = async (query: {notification: any, user: any}) : Promise<{ errors?: ErrorInterface[]; result?: NotificationDto | any }> => {
        const notification = await this._notificationModel.checkIfExist({ _id: query.notification, user: query.user })
        if (!notification.status) return { errors: [{message: notification.error}] };

        // update the notication to seen
        await this._notificationModel.update(query.notification, {seen: true})
    
         return { result: notification.data?.getModel };
    }

    public readAllNotification = async (query: { user: any}) : Promise<{ errors?: ErrorInterface[]; result?: NotificationDto | any }> => {
        const readNotification = await Notification.updateMany({user: query.user}, {seen: true}, {new: true})
    
        return { result: readNotification };
    }

    public removeNotification = async (query: {notification: any, user: any}) : Promise<{ errors?: ErrorInterface[]; result?: NotificationDto | any }> => {
        const removeNotification = await Notification.deleteOne({_id: query.notification, user: query.user})
        if (!removeNotification) return { errors: [{message: "Unable to remove notification"}] };
    
        return { result: removeNotification };
    }
    
  }
  
  export default NotificationService;