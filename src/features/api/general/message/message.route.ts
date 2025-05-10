import express from "express";
const router = express.Router();
import MessageController from "./message.controller";
import MessageService from "./message.service";
import { isScoutAuthenticated, isAthleteAuthenticated } from "../../../../shared/services/middleware/user.middleware";


const messageService = new MessageService()
const messageController = new MessageController({messageService})

router.get("/message/scout/history/:receiver", isScoutAuthenticated, messageController.getChatHistory);
router.get("/message/scout/chat-list", isScoutAuthenticated, messageController.chatList);

router.get("/message/athlete/history/:receiver", isAthleteAuthenticated, messageController.getChatHistory);
router.get("/message/athlete/chat-list", isAthleteAuthenticated, messageController.chatList);


export default router;