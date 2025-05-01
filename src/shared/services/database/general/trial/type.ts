import { ITrial } from "../../../../types/interfaces/responses/general/trial.response";
import TrialDto, { MultipleTrialDto } from "../../../../types/dtos/general/trial.dto";

interface ITrialModel {
    create: (details: Partial<ITrial>) => Promise<{status: boolean, error?: string | unknown, data?: TrialDto }>;

    checkIfExist: (details: Partial<ITrial>) => Promise<{status: boolean, error?: string | unknown, data?: TrialDto }>;

    update: (id: string, details: Partial<ITrial>) => Promise<{status: boolean, error?: string | unknown, data?: TrialDto }>;

    getAll: (details : Partial<ITrial>, option: { page: number, limit: number }) => Promise<{status: boolean, error?: string | unknown, data?: MultipleTrialDto }>;

}

export default ITrialModel;