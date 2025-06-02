"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const message_controller_1 = __importDefault(require("./message.controller"));
const message_service_1 = __importDefault(require("./message.service"));
const user_middleware_1 = require("../../../../shared/services/middleware/user.middleware");
const messageService = new message_service_1.default();
const messageController = new message_controller_1.default({ messageService });
router.get("/message/scout/history/:receiver", user_middleware_1.isScoutAuthenticated, messageController.getChatHistory);
router.get("/message/scout/chat-list", user_middleware_1.isScoutAuthenticated, messageController.chatList);
router.get("/message/athlete/history/:receiver", user_middleware_1.isAthleteAuthenticated, messageController.getChatHistory);
router.get("/message/athlete/chat-list", user_middleware_1.isAthleteAuthenticated, messageController.chatList);
exports.default = router;
