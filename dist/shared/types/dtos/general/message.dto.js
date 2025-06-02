"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MessageDto {
    constructor(message) {
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
            updatedAt: this.updatedAt ? new Date(this.updatedAt) : undefined,
            createdAt: this.createdAt ? new Date(this.createdAt) : undefined,
        };
    }
}
exports.default = MessageDto;
