import MessageModel, {Message} from "../../../../shared/services/database/general/message/index";
import ErrorInterface from "../../../../shared/types/interfaces/responses/error";
import MessageDto from "../../../../shared/types/dtos/general/message.dto";
import mongoose from "mongoose";

const message = new MessageModel()


class MessageService {
  
    public getChatHistory = async (receiver: any, sender: any) : Promise<{ errors?: ErrorInterface[]; result?: MessageDto | any }> => {
        const messages = await Message.find({
            $or: [
              { sender: sender, receiver: receiver },
              { sender: receiver, receiver: sender }
            ]
          }).sort({ createdAt: 1 })
          .populate({
            path: 'sender',  // Path to populate
            model: 'UserAccount',  // Explicitly specifying the model is optional but sometimes necessary
            select: '-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt -accountType'
          })
          .populate({
            path: 'receiver',  // Path to populate
            model: 'UserAccount',
            select: '-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt -accountType' 
          });;
   
        return { result: messages };
    }

    public chatList = async (user: any) : Promise<{ errors?: ErrorInterface[]; result?: MessageDto | any }> => {
        const currentUserId = new mongoose.Types.ObjectId(user);

        const chatList = await Message.aggregate([
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
    }

    
  }
  
  export default MessageService;