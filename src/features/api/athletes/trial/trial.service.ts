import ErrorInterface from "../../../../shared/types/interfaces/responses/error";
import ITrailModel from "../../../../shared/services/database/general/trial/type";
import { Trial } from "../../../../shared/services/database/general/trial/index";
import TrialDto, { MultipleTrialDto } from "../../../../shared/types/dtos/general/trial.dto";
import ITrialApplicationModel from "../../../../shared/services/database/athletes/trialApplication/type";
import { AthleteSearchType, ITrialApplicationRequest } from "../../../../shared/types/interfaces/requests/athletes/trial.request";
import TrialApplicationDto from "../../../../shared/types/dtos/athletes/trialApplication.dto";
import cloudinary from "../../../../shared/services/cloudinary/bocket";
import { TrialApplicationStatus } from "../../../../shared/types/interfaces/responses/athletes/trialApplication.rseponse";
import { TrialApplication } from "../../../../shared/services/database/athletes/trialApplication/index";
import { UserAccount } from "../../../../shared/services/database/athletes/auth/index";
import INotificationModel from "../../../../shared/services/database/general/notification/type";


class TrialService {
    private _trailModel: ITrailModel;
    private _trialApplicationModel: ITrialApplicationModel
    private _notificationModel: INotificationModel

    
    constructor (
      { trailModel, trialApplicationModel, notificationModel} : {
        trailModel: ITrailModel;
        trialApplicationModel: ITrialApplicationModel
        notificationModel: INotificationModel
      }){
        this._trailModel = trailModel;
        this._trialApplicationModel = trialApplicationModel
        this._notificationModel = notificationModel
    }
  
    public allPaginatedTrial = async (option: { page: number, limit: number }) : Promise<{ errors?: ErrorInterface[]; trials?: MultipleTrialDto | any }> => {
        const trials = await this._trailModel.getAll({}, option);
        if (!trials.status) return { errors: [{message: trials.error}] };
   
        return { trials: trials.data?.getResponse };
    }

    public singleTrial = async (option: { trialId: any }) : Promise<{ errors?: ErrorInterface[]; trial?: TrialDto | any }> => {
        // const trial = await this._trailModel.checkIfExist({_id: option.trialId})
        // if (!trial.status) return { errors: [{message: trial.error}] };

        const trial = await Trial.findOne({_id: option.trialId})
        .populate({
            path: 'scout',  // Path to populate
            model: 'UserAccount',  // Explicitly specifying the model is optional but sometimes necessary
            select: '-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt -accountType -achievement -experience -education -statistic' 
        });

        if (!trial) return { errors: [{message: "Trial not found"}] };
   
        return { trial: trial };
    }

    public searchTrial = async (query: { searchType?: AthleteSearchType, page?: string, limit?: string, name?: string, location?: string, type?: string, free?: boolean, eligibility?: string, gender?: string}) : Promise<{ errors?: ErrorInterface[]; result?: TrialDto | any }> => {
        const filter: any = {};

        const page: number = parseInt(query.page!) || 1; // or get from query params
        const limit: number = parseInt(query.limit!) || 50;
        const skip = (page - 1) * limit;

        // OR logic: build conditions dynamically
        const orConditions: any[] = [];

        // Case-insensitive partial match for name
        if (query.name) {
            filter.name = { $regex: query.name, $options: 'i' };
        }

        if (query.type) {
            // filter.trialType = query.type;
            orConditions.push({ trialType: query.type });
        }

        if (query.gender) {
            orConditions.push({ gender: query.gender });
        }

        if (query.location) {
            // filter.location = query.location;
            orConditions.push({ location: { $regex: query.location, $options: 'i' } });
        }

        if (query.eligibility) {
            // filter.eligibility = query.eligibility;
            orConditions.push({ eligibility: { $regex: query.eligibility, $options: 'i' } });
        }

        if (typeof query.free === 'boolean') {
            // filter.free = query.free;
            orConditions.push({ free: query.free });
        }

        if (typeof query.free === 'string') {
            const checkFree = filter.free = query.free === 'true';
            orConditions.push({ free: checkFree });
        }

        console.log("filter", filter)

        let result: any = await Trial.find(filter).skip(skip).limit(limit).sort({createdAt: -1});
        let total = await Trial.countDocuments(filter)

        if (query.searchType == AthleteSearchType.Scout) {
            result = await UserAccount.find(filter).skip(skip).limit(limit).sort({createdAt: -1});
            total = await UserAccount.countDocuments(filter)
        }else{
            result = await Trial.find(filter).skip(skip).limit(limit).sort({createdAt: -1});
            total = await Trial.countDocuments(filter)
        }

    
        
        return { result: {
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total,
            result
        } };
    }

    public applyForTrial = async (payload: { trial: ITrialApplicationRequest, userId: any, file: any }) : Promise<{ errors?: ErrorInterface[]; result?: TrialApplicationDto | any }> => {
        const checkTrial = await this._trailModel.checkIfExist({_id: payload.trial.trial})
        if (!checkTrial.status) return { errors: [{message: "Trial not found"}] };

        const checkApplication = await this._trialApplicationModel.checkIfExist({athlete: payload.userId, trial: payload.trial.trial})
        if (checkApplication.status) return { errors: [{message: "You had applied for this trial"}] };

        if (!payload.file && !payload.file?.buffer) return { errors: [{message: "Document is required"}] };

        const uploadResult = await new Promise<{ url: string }>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
            { folder: "my_app_images", resource_type: 'video', },
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

        const athlete = await UserAccount.findOne({_id: payload.userId})

        await this._notificationModel.create({
            user: payload.userId,
            title: `You have successfully registered for ${checkTrial.data?.name}`,
            description: `Thank you for registering for the ${checkTrial.data?.name} happening on ${checkTrial.data?.trialDate}. Venue ${checkTrial.data?.location}. Please arrive 30 minutes early`
        })

        await this._notificationModel.create({
            user: checkTrial.data?.scout,
            title: `${athlete?.name} applied for Your ${checkTrial.data?.name}`,
            description: `${athlete?.name} applied for the ${checkTrial.data?.name} happening on ${checkTrial.data?.trialDate}. Please view their profile and video submissions for evaluation`
        })

        const newApplicant = await TrialApplication.countDocuments({trial: payload.trial.trial, status: TrialApplicationStatus.Pending})

        await this._notificationModel.create({
            user: checkTrial.data?.scout,
            title: `Your Trial ${checkTrial.data?.name} now has ${newApplicant} pending application`,
            description: `You have ${newApplicant} new application for ${checkTrial.data?.name} review and shortlist candidates before ${checkTrial.data?.trialDate}`
        })
        
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

    public getScoutProfile = async (query: { scout: any, }) : Promise<{ errors?: ErrorInterface[]; result?: TrialDto | any }> => {   
        const scout = await UserAccount.findOne({_id: query.scout})
        .select('-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt -accountType -achievement -experience -education -statistic')
        if (!scout) return { errors: [{message: "Scout not Found"}] };
        
        return { result: scout };
    }
}

export default TrialService;