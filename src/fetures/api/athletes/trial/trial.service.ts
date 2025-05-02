import ErrorInterface from "../../../../shared/types/interfaces/responses/error";
import ITrailModel from "../../../../shared/services/database/general/trial/type";
import { Trial } from "../../../../shared/services/database/general/trial/index";
import TrialDto, { MultipleTrialDto } from "../../../../shared/types/dtos/general/trial.dto";
import ITrialApplicationModel from "../../../../shared/services/database/athletes/trialApplication/type";
import { ITrialApplicationRequest } from "../../../../shared/types/interfaces/requests/athletes/trial.request";
import TrialApplicationDto from "../../../../shared/types/dtos/athletes/trialApplication.dto";
import cloudinary from "../../../../shared/services/cloudinary/bocket";
import { TrialApplicationStatus } from "../../../../shared/types/interfaces/responses/athletes/trialApplication.rseponse";
import { TrialApplication } from "../../../../shared/services/database/athletes/trialApplication/index";


class TrialService {
    private _trailModel: ITrailModel;
    private _trialApplicationModel: ITrialApplicationModel
    
    constructor (
      { trailModel, trialApplicationModel} : {
        trailModel: ITrailModel;
        trialApplicationModel: ITrialApplicationModel
      }){
        this._trailModel = trailModel;
        this._trialApplicationModel = trialApplicationModel
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

    public applyForTrial = async (payload: { trial: ITrialApplicationRequest, userId: any, file: any }) : Promise<{ errors?: ErrorInterface[]; result?: TrialApplicationDto | any }> => {
        const checkApplication = await this._trialApplicationModel.checkIfExist({athlete: payload.userId, trial: payload.trial.trial})
        if (checkApplication.status) return { errors: [{message: "You had applied for this trial"}] };

        if (!payload.file && !payload.file?.buffer) return { errors: [{message: "Document is required"}] };

        const uploadResult = await new Promise<{ url: string }>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
            { folder: "my_app_images" },
            (error, result) => {
                if (error || !result) return { errors: [{message: "unable to upload image"}] };
                resolve({ url: result.secure_url });
            }
            );
    
            stream.write(payload.file.buffer);
            stream.end();
        });
    
        const document = uploadResult.url;

        const trailPayload = {
            athlete: payload.userId,
            document,
            status: TrialApplicationStatus.Pending,
            ...payload.trial
        }

        const apply = await this._trialApplicationModel.create(trailPayload)
        if (!apply.status) return { errors: [{message: apply.error}] };
        
        return { result: apply.data?.getModel };
    }

    public getUrTrial = async (query: { page?: string, limit?: string, userId: any}) : Promise<{ errors?: ErrorInterface[]; result?: TrialDto | any }> => {   
        const page: number = parseInt(query.page!) || 1; // or get from query params
        const limit: number = parseInt(query.limit!) || 50;
        const skip = (page - 1) * limit;

        const trials = await TrialApplication.find({athlete: query.userId}).skip(skip).limit(limit).sort({createdAt: -1})
        .populate({
            path: 'trial',  // Path to populate
            model: 'Trials'  // Explicitly specifying the model is optional but sometimes necessary
        }) ;
        const total = await TrialApplication.countDocuments({athlete: query.userId})
        
        return { result: {
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total,
            trials
        } };
    }

    public getUrSingleTrial = async (query: { trial: string, userId: any}) : Promise<{ errors?: ErrorInterface[]; result?: TrialDto | any }> => {   
        const trial = await TrialApplication.findOne({athlete: query.userId, _id: query.trial})
        .populate({
            path: 'trial',  // Path to populate
            model: 'Trials'  // Explicitly specifying the model is optional but sometimes necessary
        });
        if (!trial) return { errors: [{message: "Trial not Found"}] };
        
        return { result: trial };
    }
}

export default TrialService;