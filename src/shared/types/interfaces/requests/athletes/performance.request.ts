import { PerformanceVisibility } from "../../responses/athletes/performance.response";

export interface IPerformanceRequest {
    description: string;
    visibility: PerformanceVisibility,
}