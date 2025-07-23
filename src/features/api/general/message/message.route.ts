import express from "express";
const router = express.Router();
import MessageController from "./message.controller";
import MessageService from "./message.service";
import { isScoutAuthenticated, isAthleteAuthenticated } from "../../../../shared/services/middleware/user.middleware";
import { MessageValidation } from "./message.validation";


const messageService = new MessageService()
const messageController = new MessageController({messageService})

router.get("/message/scout/history/:receiver", isScoutAuthenticated, messageController.getChatHistory);
router.get("/message/scout/chat-list", isScoutAuthenticated, messageController.chatList);
router.get("/message/scout/sent", isScoutAuthenticated, messageController.getUnseenMessage);
router.post("/message/scout/mark-read", isScoutAuthenticated, MessageValidation.markMessageToRead, MessageValidation.validateFormData, messageController.markMessageToRead);

router.get("/message/athlete/history/:receiver", isAthleteAuthenticated, messageController.getChatHistory);
router.get("/message/athlete/chat-list", isAthleteAuthenticated, messageController.chatList);
router.get("/message/athlete/sent", isAthleteAuthenticated, messageController.getUnseenMessage);
router.post("/message/athlete/mark-read", isAthleteAuthenticated, MessageValidation.markMessageToRead, MessageValidation.validateFormData, messageController.markMessageToRead);


export default router;