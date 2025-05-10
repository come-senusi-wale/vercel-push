import { MessageType } from "../../responses/general/message.response";

export interface ISendMessageRequest {
    sender: any;
    receiver: any;
    content?: string;  // For text messages
    fileUrl?: string;  // URL to stored file
    fileName?: string; // Original file name
    fileType?: string; // MIME type
    messageType: MessageType; 
}