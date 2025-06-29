import express from "express";
const router = express.Router();
import NotificationController from "./notification.controller";
import NotificationService from "./notification.service";
import { NotificationValidation } from "./notification.validation";
import NotificationModel from "../../../../shared/services/database/general/notification/index";
import { isUserAuthenticated } from "../../../../shared/services/middleware/user.middleware";




const notificationModel = new NotificationModel()
const notificationService = new NotificationService({ notificationModel })
const notificationController = new NotificationController({notificationService})

router.get("/notification", isUserAuthenticated, NotificationValidation.pagination, NotificationValidation.validateFormData, notificationController.getAllNotification);
router.get("/notifications", isUserAuthenticated, NotificationValidation.notifications, NotificationValidation.validateFormData, notificationController.getAllNotificationTwo);
router.get("/notification/:notificationId", isUserAuthenticated, notificationController.getSingleNotification);
router.post("/notification/read", isUserAuthenticated, notificationController.readAllNotification);
router.post("/notification/remove/:notificationId", isUserAuthenticated, notificationController.removeNotification);

export default router;