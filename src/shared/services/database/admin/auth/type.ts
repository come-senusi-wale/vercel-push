import AminDto from "../../../../types/dtos/admin/admin.dto";
import { IAdminAccount } from "../../../../types/interfaces/responses/admin/admin.response";

interface IAdminModel {
    createAccountDB: (details: Partial<IAdminAccount>) => Promise<{status: boolean, error?: string | unknown, data?: AminDto }>;

    checkIfExist: (details: Partial<IAdminAccount>) => Promise<{status: boolean, error?: string | unknown, data?: AminDto }>;

    updateAccount: (id: string, details: Partial<IAdminAccount>) => Promise<{status: boolean, error?: string | unknown, data?: AminDto }>;
}

export default IAdminModel;