import { IPerformance } from "../../../../types/interfaces/responses/athletes/performance.response";
import PerformanceDto from "../../../../types/dtos/athletes/performamnce.dto";

interface ITrialApplicationModel {
    create: (details: Partial<IPerformance>) => Promise<{status: boolean, error?: string | unknown, data?: PerformanceDto }>;

    checkIfExist: (details: Partial<IPerformance>) => Promise<{status: boolean, error?: string | unknown, data?: PerformanceDto }>;

    update: (id: string, details: Partial<IPerformance>) => Promise<{status: boolean, error?: string | unknown, data?: PerformanceDto }>;

    // getAll: (details : Partial<ITrialApplication>, option: { page: number, limit: number }) => Promise<{status: boolean, error?: string | unknown, data?: TrialApplicationDto }>;

}

export default ITrialApplicationModel;