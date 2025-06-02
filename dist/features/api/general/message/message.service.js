"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const index_1 = __importStar(require("../../../../shared/services/database/general/message/index"));
const mongoose_1 = __importDefault(require("mongoose"));
const message = new index_1.default();
class MessageService {
    constructor() {
        this.getChatHistory = (receiver, sender) => __awaiter(this, void 0, void 0, function* () {
            const messages = yield index_1.Message.find({
                $or: [
                    { sender: sender, receiver: receiver },
                    { sender: receiver, receiver: sender }
                ]
            }).sort({ createdAt: 1 })
                .populate({
                path: 'sender', // Path to populate
                model: 'UserAccount', // Explicitly specifying the model is optional but sometimes necessary
                select: '-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt -accountType'
            })
                .populate({
                path: 'receiver', // Path to populate
                model: 'UserAccount',
                select: '-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt -accountType'
            });
            return { result: messages };
        });
        this.chatList = (user) => __awaiter(this, void 0, void 0, function* () {
            const currentUserId = new mongoose_1.default.Types.ObjectId(user);
            const chatList = yield index_1.Message.aggregate([
                {
                    $match: {
                        $or: [
                            { sender: currentUserId },
                            { receiver: currentUserId }
                        ]
                    }
                },
                {
                    $addFields: {
                        otherUser: {
                            $cond: [
                                { $eq: ["$sender", currentUserId] },
                                "$receiver",
                                "$sender"
                            ]
                        }
                    }
                },
                {
                    $sort: { createdAt: -1 }
                },
                {
                    $group: {
                        _id: "$otherUser",
                        lastMessage: { $first: "$content" },
                        fileUrl: { $first: "$fileUrl" },
                        messageType: { $first: "$messageType" },
                        timestamp: { $first: "$createdAt" }
                    }
                },
                {
                    $lookup: {
                        from: "useraccounts", // matches the actual MongoDB collection name (lowercase plural usually)
                        localField: "_id",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                { $unwind: "$user" },
                {
                    $project: {
                        userId: "$user._id",
                        name: "$user.name",
                        email: "$user.email",
                        lastMessage: 1,
                        fileUrl: 1,
                        messageType: 1,
                        timestamp: 1
                    }
                },
                {
                    $sort: { timestamp: -1 }
                }
            ]);
            return { result: chatList };
        });
    }
}
exports.default = MessageService;
