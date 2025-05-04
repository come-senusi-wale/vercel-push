import ErrorInterface from "../../../../shared/types/interfaces/responses/error";
import ITrailModel from "../../../../shared/services/database/general/trial/type";
import {Trial} from "../../../../shared/services/database/general/trial/index";
import TrialDto from "../../../../shared/types/dtos/general/trial.dto";
import { ICreateTrialRequest } from "../../../../shared/types/interfaces/requests/scouts/trial.request";
import { v4 as uuidv4 } from "uuid";
import { uploadToS3 } from "../../../../shared/services/aws/s3";
import cloudinary from "../../../../shared/services/cloudinary/bocket";
import { TrialApplication } from "../../../../shared/services/database/athletes/trialApplication";


class TrialService {
    private _trailModel: ITrailModel;
    
    constructor (
      { trailModel } : {
        trailModel: ITrailModel;
      }){
        this._trailModel = trailModel;
    }
  
    public create = async (trial: ICreateTrialRequest, file: any | undefined, userId: any) : Promise<{ errors?: ErrorInterface[]; trial?: TrialDto | any }> => {
        let trialFile = ""

        if (file && file?.buffer) {
            const uploadResult = await new Promise<{ url: string }>((resolve, reject) => {
              const stream = cloudinary.uploader.upload_stream(
                { folder: "my_app_images" },
                (error, result) => {
                  if (error || !result) return { errors: [{message: "unable to upload image"}] };
                  resolve({ url: result.secure_url });
                }
              );
      
              stream.write(file.buffer);
              stream.end();
            });
      
            trialFile = uploadResult.url;
        }
          

        // if (file) {
        //     const filename = uuidv4();
        //     const result = await uploadToS3(file.buffer, `${filename}.jpg`);
        //     trialFile = result?.Location!;
        // } 

        let trialPayload = {
            scout: userId,
            file: trialFile,
            ...trial,
        }

        const createTrial = await this._trailModel.create(trialPayload);
        if (!createTrial.status) return { errors: [{message: createTrial.error}] };
   
   
        return { trial: createTrial.data?.getModel };

    }

    public getAllTrial = async (query: { page?: string, limit?: string, userId: any}) : Promise<{ errors?: ErrorInterface[]; result?: TrialDto | any }> => {
      const page: number = parseInt(query.page!) || 1; // or get from query params
      const limit: number = parseInt(query.limit!) || 50;
      const skip = (page - 1) * limit;

      const trials = await Trial.find({scout: query.userId}).skip(skip).limit(limit).sort({createdAt: -1})
      
      const total = await Trial.countDocuments({scout: query.userId})
      
      return { result: {
          totalPages: Math.ceil(total / limit),
          currentPage: page,
          total,
          trials
      } };
    }

    public getSingleTrial = async (query: { trial: string, userId: any}) : Promise<{ errors?: ErrorInterface[]; result?: TrialDto | any }> => {   
      const trial = await Trial.findOne({scout: query.userId, _id: query.trial})
      if (!trial) return { errors: [{message: "Trial not Found"}] };

      const applicant = await TrialApplication.find({trial: trial._id})
      .populate({
        path: 'athlete',  // Path to populate
        model: 'UserAccount'  // Explicitly specifying the model is optional but sometimes necessary
      });
      
      return { result: {trial, applicant} };
    }

    public acceptApplicant = async (query: { trial: string, userId: any}) : Promise<{ errors?: ErrorInterface[]; result?: TrialDto | any }> => {   
      
      
      return { result: "" };
    }

    public rejectApplicant = async (query: { trial: string, userId: any}) : Promise<{ errors?: ErrorInterface[]; result?: TrialDto | any }> => {   
      
      
      return { result: "" };
    }
}

export default TrialService;