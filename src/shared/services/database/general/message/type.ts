import { IMessage } from "../../../../types/interfaces/responses/general/message.response";
import MessageDto from "../../../../types/dtos/general/message.dto";

interface IMessageModel {
    create: (details: Partial<IMessage>) => Promise<{status: boolean, error?: string | unknown, data?: MessageDto }>;

    checkIfExist: (details: Partial<IMessage>) => Promise<{status: boolean, error?: string | unknown, data?: MessageDto }>;

    update: (id: string, details: Partial<IMessage>) => Promise<{status: boolean, error?: string | unknown, data?: MessageDto }>;

    // getAll: (details : Partial<IMessage>, option: { page: number, limit: number }) => Promise<{status: boolean, error?: string | unknown, data?: MessageDto }>;

}

export default IMessageModel;