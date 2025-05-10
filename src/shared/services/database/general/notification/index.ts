import { Schema, model, PaginateModel } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
import { INotification } from "../../../../types/interfaces/responses/general/notification.response";
import INotificationModel from "./type";
import NotificationDto, { MultipleNotificationDto } from "../../../../types/dtos/general/notification.dto";


const NotificationSchema = new Schema<INotification>({
    user: {
      type: Schema.Types.ObjectId, 
      ref: 'UserAccount',
      required: true
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    seen: {
        type: Boolean,
        default: false
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
});
  
NotificationSchema.plugin(mongoosePaginate);

export const Notification = model<INotification, PaginateModel<INotification>>("Notifications", NotificationSchema)

class  NotificationModel implements  INotificationModel {
    Notification: typeof Notification;
      
    constructor() {
        this.Notification =  Notification;
    }
  
    create = async (details: Partial<INotification>) => {
        try {
            const data = await this.Notification.create(details);
            if (data) {
              return {status: true, data: new NotificationDto(data)};
            } else {
              return {status: false, error: "Couldn't create notification"};
            }
        } catch (error) {
            return {status: false, error };
        }
    }
  
    checkIfExist = async (details: Partial<INotification>) => {
        try {
            const data = await this.Notification.findOne(details);
            if (data) {
              return {status: true, data: new NotificationDto(data)};
            } else {
              return {status: false, error: "No Notification find"};
            }
        } catch (error) {
            return {status: false, error };
        }
    }
  
    update = async (id: string, details: Partial<INotification>) => {
      try {
          const data = await this.Notification.findOneAndUpdate({_id: id}, details, {new: true});
          if (data) {
            return {status: true, data: new NotificationDto(data)};
          } else {
            return {status: false, error: "Unable to update Notification"};
          }
      } catch (error) {
          return {status: false, error };
      }
    }
  
    getAll = async (details: Partial<INotification>, option: { page: number, limit: number }) => {
      try {
        const data = await this.Notification.paginate(details, {...option, sort: {createdAt: -1}});
        if (data) {
          return {status: true,
            data: new MultipleNotificationDto({
              notifications : data.docs,
              totalTrial: data.totalDocs,
              hasNextPage: data.hasNextPage
          })};
        } else {
          return {status: false, error: "Unable to get notifications"};
        }
      } catch (error) {
          return {status: false, error };
      }
    }
  
  
  }
  
  export default NotificationModel;