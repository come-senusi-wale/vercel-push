import { Schema, model, PaginateModel } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
import { IMessage, MessageStatus, MessageType } from "../../../../types/interfaces/responses/general/message.response";
import IMessageModel from "./type";
import MessageDto from "../../../../types/dtos/general/message.dto";


const MessageSchema = new Schema<IMessage>({
    sender: {
      type: Schema.Types.ObjectId, 
      ref: 'UserAccount',
      required: true
    },
    receiver: {
        type: Schema.Types.ObjectId, 
        ref: 'UserAccount',
        required: true
    },
    content: {
        type: String,
    },
    fileUrl: {
      type: String,  
    },
    fileName: {
        type: String,
    },
    fileType: {
        type: String,
    },
    messageType: {
        type: String,
        enum: Object.values(MessageType),  
        required: true, 
    },
    status: {
      type: String,
      enum: Object.values(MessageStatus),
      default: MessageStatus.Sent
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
  
MessageSchema.plugin(mongoosePaginate);

export const Message = model<IMessage, PaginateModel<IMessage>>("Messages", MessageSchema)


class MessageModel implements  IMessageModel {
    Message: typeof Message;
      
    constructor() {
        this.Message =  Message;
    }
  
    create = async (details: Partial<IMessage>) => {
        try {
            const data = await this.Message.create(details);
            if (data) {
              return {status: true, data: new MessageDto(data)};
            } else {
              return {status: false, error: "Couldn't create message"};
            }
        } catch (error) {
            return {status: false, error };
        }
    }
  
    checkIfExist = async (details: Partial<IMessage>) => {
        try {
            const data = await this.Message.findOne(details);
            if (data) {
              return {status: true, data: new MessageDto(data)};
            } else {
              return {status: false, error: "No Trial Message"};
            }
        } catch (error) {
            return {status: false, error };
        }
    }
  
    update = async (id: string, details: Partial<IMessage>) => {
      try {
          const data = await this.Message.findOneAndUpdate({_id: id}, details, {new: true});
          if (data) {
            return {status: true, data: new MessageDto(data)};
          } else {
            return {status: false, error: "Unable to update configuration"};
          }
      } catch (error) {
          return {status: false, error };
      }
    }
  
    // getAll = async (details: Partial<IMessage>, option: { page: number, limit: number }) => {
    //   try {
    //     const data = await this.Trial.paginate(details, {...option, sort: {createdAt: -1}});
    //     if (data) {
    //       return {status: true,
    //         data: new MultipleTrialDto({
    //           trials : data.docs,
    //           totalTrial: data.totalDocs,
    //           hasNextPage: data.hasNextPage
    //       })};
    //     } else {
    //       return {status: false, error: "Unable to update configuration"};
    //     }
    //   } catch (error) {
    //       return {status: false, error };
    //   }
    // }
  
  
  }
  
  export default MessageModel;