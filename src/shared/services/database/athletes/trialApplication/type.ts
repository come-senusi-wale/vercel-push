import { ITrialApplication } from "../../../../types/interfaces/responses/athletes/trialApplication.rseponse";
import TrialApplicationDto from "../../../../types/dtos/athletes/trialApplication.dto";

interface ITrialApplicationModel {
    create: (details: Partial<ITrialApplication>) => Promise<{status: boolean, error?: string | unknown, data?: TrialApplicationDto }>;

    checkIfExist: (details: Partial<ITrialApplication>) => Promise<{status: boolean, error?: string | unknown, data?: TrialApplicationDto }>;

    update: (id: string, details: Partial<ITrialApplication>) => Promise<{status: boolean, error?: string | unknown, data?: TrialApplicationDto }>;

    // getAll: (details : Partial<ITrialApplication>, option: { page: number, limit: number }) => Promise<{status: boolean, error?: string | unknown, data?: TrialApplicationDto }>;

}

export default ITrialApplicationModel;