"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const message_response_1 = require("../../../../types/interfaces/responses/general/message.response");
const message_dto_1 = __importDefault(require("../../../../types/dtos/general/message.dto"));
const MessageSchema = new mongoose_1.Schema({
    sender: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'UserAccount',
        required: true
    },
    receiver: {
        type: mongoose_1.Schema.Types.ObjectId,
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
        enum: Object.values(message_response_1.MessageType),
        required: true,
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
MessageSchema.plugin(mongoose_paginate_v2_1.default);
exports.Message = (0, mongoose_1.model)("Messages", MessageSchema);
class MessageModel {
    constructor() {
        this.create = (details) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.Message.create(details);
                if (data) {
                    return { status: true, data: new message_dto_1.default(data) };
                }
                else {
                    return { status: false, error: "Couldn't create message" };
                }
            }
            catch (error) {
                return { status: false, error };
            }
        });
        this.checkIfExist = (details) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.Message.findOne(details);
                if (data) {
                    return { status: true, data: new message_dto_1.default(data) };
                }
                else {
                    return { status: false, error: "No Trial Message" };
                }
            }
            catch (error) {
                return { status: false, error };
            }
        });
        this.update = (id, details) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.Message.findOneAndUpdate({ _id: id }, details, { new: true });
                if (data) {
                    return { status: true, data: new message_dto_1.default(data) };
                }
                else {
                    return { status: false, error: "Unable to update configuration" };
                }
            }
            catch (error) {
                return { status: false, error };
            }
        });
        this.Message = exports.Message;
    }
}
exports.default = MessageModel;
