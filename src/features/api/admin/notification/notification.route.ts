import express from "express";
const router = express.Router();
import NotificationController from "./notification.controller";
import NotificationService from "./notification.service";
import { AdminNotificationValidation } from "./notification.validation";
import NotificationModel from "../../../../shared/services/database/general/notification/index";
import { isAdminAuthenticated } from "../../../../shared/services/middleware/admin.middleware";




const notificationModel = new NotificationModel()
const notificationService = new NotificationService({ notificationModel })
const notificationController = new NotificationController({notificationService})

router.post("/notification/create", isAdminAuthenticated, AdminNotificationValidation.createNotification, AdminNotificationValidation.validateFormData, notificationController.createNotification);
router.get("/notifications", isAdminAuthenticated, AdminNotificationValidation.pagination, AdminNotificationValidation.validateFormData, notificationController.getAllNotification);
router.get("/notification/:notificationId", isAdminAuthenticated, notificationController.getSingleNotification);
router.get("/notifications/total-sent", isAdminAuthenticated, notificationController.totalSent);
router.get("/notifications/total-schedule", isAdminAuthenticated, notificationController.totalSchedule);

export default router;