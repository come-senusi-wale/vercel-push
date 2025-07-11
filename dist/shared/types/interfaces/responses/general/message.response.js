"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageStatus = exports.MessageType = void 0;
var MessageType;
(function (MessageType) {
    MessageType["Text"] = "text";
    MessageType["Image"] = "image";
    MessageType["Video"] = "video";
    MessageType["Document"] = "document";
})(MessageType || (exports.MessageType = MessageType = {}));
var MessageStatus;
(function (MessageStatus) {
    MessageStatus["Sent"] = "sent";
    MessageStatus["Seen"] = "seen";
})(MessageStatus || (exports.MessageStatus = MessageStatus = {}));
