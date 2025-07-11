import { Document, Types , Schema} from 'mongoose';
export enum MessageType {
    Text = 'text',
    Image = 'image',
    Video = 'video',
    Document = 'document'
}

export enum MessageStatus {
    Sent = 'sent',
    Seen = 'seen',
}

export interface IMessage {
    _id: string;
    sender: Schema.Types.ObjectId;
    receiver: Schema.Types.ObjectId;
    content?: string;  // For text messages
    fileUrl?: string;  // URL to stored file
    fileName?: string; // Original file name
    fileType?: string; // MIME type
    messageType: MessageType;
    status: MessageStatus;
    updatedAt?: Date;
    createdAt?: Date;
}