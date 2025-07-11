import { emitToUser, emitToAll } from "./socket";
import MessageModel from "../database/general/message/index";
import { ISendMessageRequest } from "../../types/interfaces/requests/general/meassge.request";
import UserModel from "../database/athletes/auth/index";
import { MessageStatus } from "../../types/interfaces/responses/general/message.response";

const userModel = new UserModel()
const messageModel = new MessageModel()

export const sendMessage = async (data: ISendMessageRequest) => {
    if (data.sender === data.receiver) {
        emitToAll('bad-request', { status: false, message: "You can't chat yourself" })
        return
    }
    
    const checkSender = await userModel.checkIfExist({_id: data.sender})
    if (!checkSender.status) {
        emitToAll('bad-request', { status: false, message: 'Sender not found' })
        return
    }

    const checkReceiver = await userModel.checkIfExist({_id: data.receiver})
    if (!checkReceiver.status) {
        emitToAll('bad-request', { status: false, message: 'Receiver not found' })
        return
    }

    let chatStatus = MessageStatus.Sent

    if (checkReceiver.data?.onChat) {
        chatStatus = MessageStatus.Seen
    }

    const saveMessage = await messageModel.create({...data, status: chatStatus})
    if (!saveMessage.status) {
        console.log(saveMessage.error)
        emitToAll('bad-request', { status: false, message: 'Unable to send Message' })
        return
    }

    emitToUser(data.receiver, 'receive_message', saveMessage.data?.getModel)
    emitToUser(data.sender, 'delivered_message', saveMessage.data?.getModel)
}