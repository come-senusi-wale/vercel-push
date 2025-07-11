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
exports.sendMessage = void 0;
const socket_1 = require("./socket");
const index_1 = __importDefault(require("../database/general/message/index"));
const index_2 = __importDefault(require("../database/athletes/auth/index"));
const message_response_1 = require("../../types/interfaces/responses/general/message.response");
const userModel = new index_2.default();
const messageModel = new index_1.default();
const sendMessage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    if (data.sender === data.receiver) {
        (0, socket_1.emitToAll)('bad-request', { status: false, message: "You can't chat yourself" });
        return;
    }
    const checkSender = yield userModel.checkIfExist({ _id: data.sender });
    if (!checkSender.status) {
        (0, socket_1.emitToAll)('bad-request', { status: false, message: 'Sender not found' });
        return;
    }
    const checkReceiver = yield userModel.checkIfExist({ _id: data.receiver });
    if (!checkReceiver.status) {
        (0, socket_1.emitToAll)('bad-request', { status: false, message: 'Receiver not found' });
        return;
    }
    let chatStatus = message_response_1.MessageStatus.Sent;
    if ((_a = checkReceiver.data) === null || _a === void 0 ? void 0 : _a.onChat) {
        chatStatus = message_response_1.MessageStatus.Seen;
    }
    const saveMessage = yield messageModel.create(Object.assign(Object.assign({}, data), { status: chatStatus }));
    if (!saveMessage.status) {
        console.log(saveMessage.error);
        (0, socket_1.emitToAll)('bad-request', { status: false, message: 'Unable to send Message' });
        return;
    }
    (0, socket_1.emitToUser)(data.receiver, 'receive_message', (_b = saveMessage.data) === null || _b === void 0 ? void 0 : _b.getModel);
    (0, socket_1.emitToUser)(data.sender, 'delivered_message', (_c = saveMessage.data) === null || _c === void 0 ? void 0 : _c.getModel);
});
exports.sendMessage = sendMessage;
