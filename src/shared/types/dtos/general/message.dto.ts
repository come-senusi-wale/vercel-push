import { Schema, Types } from "mongoose";
import { IMessage, MessageType } from "../../interfaces/responses/general/message.response";

class MessageDto implements IMessage {
    public _id: string;
    sender: Schema.Types.ObjectId;
    receiver: Schema.Types.ObjectId;
    content?: string | undefined;
    fileUrl?: string | undefined;
    fileName?: string | undefined;
    fileType?: string | undefined;
    messageType: MessageType;
    public updatedAt?: Date;
    public createdAt?: Date;
    
    constructor(message: IMessage) {
      this._id = message._id;
      this.sender = message.sender;
      this.receiver = message.receiver;
      this.content = message.content;
      this.fileUrl = message.content;
      this.fileName = message.fileName;
      this.fileType = message.fileType;
      this.messageType = message.messageType;
      this.updatedAt = message.updatedAt;
      this.createdAt = message.createdAt;
    }
    get getModel() {
      return {
        _id: this._id,
        sender: this.sender,
        receiver: this.receiver,
        content: this.content,
        fileUrl: this.fileUrl,
        fileName: this.fileName,
        fileType: this.fileType,
        messageType: this.messageType,
        updatedAt: this.updatedAt ? new Date(this.updatedAt): undefined,
        createdAt: this.createdAt ? new Date(this.createdAt): undefined,
      } as IMessage
    }
}


export default MessageDto;