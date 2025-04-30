import { IAthletesAccount } from "../../../../types/interfaces/responses/athletes/athlete.response";
import UserAccountDto from "../../../../types/dtos/athletes/athlete.dto";

interface IUserAccountModel {
    createAccountToDB: (details: Partial<IAthletesAccount>) => Promise<{status: boolean, error?: string | unknown, data?: UserAccountDto }>;

    checkIfExist: (details: Partial<IAthletesAccount>) => Promise<{status: boolean, error?: string | unknown, data?: UserAccountDto }>;

    updateAccount: (id: string, details: Partial<IAthletesAccount>) => Promise<{status: boolean, error?: string | unknown, data?: UserAccountDto }>;

}

export default IUserAccountModel;