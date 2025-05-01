import ErrorInterface from "../../../../shared/types/interfaces/responses/error";
import ITrailModel from "../../../../shared/services/database/general/trial/type";
import { Trial } from "../../../../shared/services/database/general/trial/index";
import TrialDto, { MultipleTrialDto } from "../../../../shared/types/dtos/general/trial.dto";
class TrialService {
    private _trailModel: ITrailModel;
    
    constructor (
      { trailModel } : {
        trailModel: ITrailModel;
      }){
        this._trailModel = trailModel;
    }
  
    public allPaginatedTrial = async (option: { page: number, limit: number }) : Promise<{ errors?: ErrorInterface[]; trials?: MultipleTrialDto | any }> => {
        const trials = await this._trailModel.getAll({}, option);
        if (!trials.status) return { errors: [{message: trials.error}] };
   
        return { trials: trials.data?.getResponse };
    }

    public singleTrial = async (option: { trialId: any }) : Promise<{ errors?: ErrorInterface[]; trial?: TrialDto | any }> => {
        const trial = await this._trailModel.checkIfExist({_id: option.trialId})
        if (!trial.status) return { errors: [{message: trial.error}] };
   
        return { trial: trial.data?.getModel };
    }

    public searchTrial = async (query: { page?: string, limit?: string, name?: string, location?: string, type?: string, free?: boolean, eligibility?: string}) : Promise<{ errors?: ErrorInterface[]; result?: TrialDto | any }> => {
        const filter: any = {};

        const page: number = parseInt(query.page!) || 1; // or get from query params
        const limit: number = parseInt(query.limit!) || 50;
        const skip = (page - 1) * limit;

        // Case-insensitive partial match for name
        if (query.name) {
            filter.name = { $regex: query.name, $options: 'i' };
        }

        if (query.type) {
            filter.trialType = query.type;
        }

        if (query.location) {
            filter.location = query.location;
        }

        if (query.eligibility) {
            filter.eligibility = query.eligibility;
        }

        if (typeof query.free === 'boolean') {
            filter.free = query.free;
        }

        if (typeof query.free === 'string') {
            filter.free = query.free === 'true';
        }

        console.log("filter", filter)

        const trial = await Trial.find(filter).skip(skip).limit(limit).sort({createdAt: -1});
        const total = await Trial.countDocuments(filter)
        
        return { result: {
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total,
            trial
        } };
    }
}

export default TrialService;