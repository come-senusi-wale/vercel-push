import ErrorInterface from "../../../../shared/types/interfaces/responses/error";
import { Performance } from "../../../../shared/services/database/athletes/performance/index";
import PerformanceDto, {  } from "../../../../shared/types/dtos/athletes/performamnce.dto";
import IPerformanceModel from "../../../../shared/services/database/athletes/performance/type";
import cloudinary from "../../../../shared/services/cloudinary/bocket";
import { IPerformanceRequest } from "../../../../shared/types/interfaces/requests/athletes/performance.request";



class PerformanceService {
    private _performanceModel: IPerformanceModel;
    constructor (
      { performanceModel} : {
        performanceModel: IPerformanceModel;
      }){
        this._performanceModel = performanceModel;
    }

    public postPerformance = async (payload: { performance: IPerformanceRequest, userId: any, file: any }) : Promise<{ errors?: ErrorInterface[]; result?: PerformanceDto | any }> => {
        if (!payload.file && !payload.file?.buffer) return { errors: [{message: "file is required"}] };

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
    
        const fileUrl = uploadResult.url;

        const trailPayload = {
            athlete: payload.userId,
            image: fileUrl,
            ...payload.performance
        }

        const performance = await this._performanceModel.create(trailPayload)
        if (!performance.status) return { errors: [{message: performance.error}] };
        
        return { result: performance.data?.getModel };
    }

    public getAllPerformance = async (query: { page?: string, limit?: string,}) : Promise<{ errors?: ErrorInterface[]; result?: PerformanceDto | any }> => {
        const page: number = parseInt(query.page!) || 1; // or get from query params
        const limit: number = parseInt(query.limit!) || 50;
        const skip = (page - 1) * limit;

        const performances = await Performance.find().skip(skip).limit(limit).sort({createdAt: -1})
        .populate({
            path: 'athlete',  // Path to populate
            model: 'UserAccount'  // Explicitly specifying the model is optional but sometimes necessary
        });
        
        const total = await Performance.countDocuments()
        
        return { result: {
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total,
            performances
        } };
    }

    public getAllUrPerformance = async (query: { page?: string, limit?: string, userId: any}) : Promise<{ errors?: ErrorInterface[]; result?: PerformanceDto | any }> => {
        const page: number = parseInt(query.page!) || 1; // or get from query params
        const limit: number = parseInt(query.limit!) || 50;
        const skip = (page - 1) * limit;

        const performances = await Performance.find({athlete: query.userId}).skip(skip).limit(limit).sort({createdAt: -1})
        
        const total = await Performance.countDocuments({athlete: query.userId})
        
        return { result: {
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total,
            performances
        } };
    }

    public getSinglePerformance = async (query: { performance: string}) : Promise<{ errors?: ErrorInterface[]; result?: PerformanceDto | any }> => {
        const performance = await Performance.findOne({_id: query.performance})
    
        if (!performance) return { errors: [{message: "Performance not Found"}] };
        
        return { result: performance };
    }
}

export default PerformanceService;