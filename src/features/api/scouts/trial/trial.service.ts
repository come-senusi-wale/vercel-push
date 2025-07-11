import ErrorInterface from "../../../../shared/types/interfaces/responses/error";
import ITrailModel from "../../../../shared/services/database/general/trial/type";
import {Trial} from "../../../../shared/services/database/general/trial/index";
import TrialDto from "../../../../shared/types/dtos/general/trial.dto";
import { ICreateTrialRequest } from "../../../../shared/types/interfaces/requests/scouts/trial.request";
import { v4 as uuidv4 } from "uuid";
import { uploadToS3 } from "../../../../shared/services/aws/s3";
import cloudinary from "../../../../shared/services/cloudinary/bocket";
import { TrialApplication } from "../../../../shared/services/database/athletes/trialApplication";
import INotificationModel from "../../../../shared/services/database/general/notification/type";
import ITrialApplicationModel from "../../../../shared/services/database/athletes/trialApplication/type";
import { TrialApplicationStatus } from "../../../../shared/types/interfaces/responses/athletes/trialApplication.rseponse";
import { UserAccount } from "../../../../shared/services/database/athletes/auth";


class TrialService {
    private _trailModel: ITrailModel;
    private _trialApplicationModel: ITrialApplicationModel
    private _notificationModel: INotificationModel
    
    constructor (
      { trailModel, trialApplicationModel, notificationModel } : {
        trailModel: ITrailModel;
        trialApplicationModel: ITrialApplicationModel;
        notificationModel: INotificationModel;
      }){
        this._trailModel = trailModel;
        this._trialApplicationModel = trialApplicationModel
        this._notificationModel = notificationModel
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

    public getSingleTrial = async (query: { trial: string, page?: string, limit?: string, userId: any}) : Promise<{ errors?: ErrorInterface[]; result?: TrialDto | any }> => {   
      const trial = await Trial.findOne({scout: query.userId, _id: query.trial})
      if (!trial) return { errors: [{message: "Trial not Found"}] };

      const page: number = parseInt(query.page!) || 1; // or get from query params
      const limit: number = parseInt(query.limit!) || 50;
      const skip = (page - 1) * limit;

      const applicant = await TrialApplication.find({trial: trial._id, status: TrialApplicationStatus.Pending})
      .skip(skip).limit(limit).sort({createdAt: -1})
      .populate({
        path: 'athlete',  // Path to populate
        model: 'UserAccount',  // Explicitly specifying the model is optional but sometimes necessary
        select: '-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt -accountType' 
      });

      const total = await TrialApplication.countDocuments({trial: trial._id, status: TrialApplicationStatus.Pending})
      
      return { result: {
        trial, 
        totalPages: Math.ceil(total / limit),
        currentPage: page,
        total,
        applicant
      } };
    }

    public getApplicantOnTrial = async (query: {trial: any, page?: string, limit?: string, userId: any, status?: TrialApplicationStatus}) : Promise<{ errors?: ErrorInterface[]; result?: TrialDto | any }> => {
      const page: number = parseInt(query.page!) || 1; // or get from query params
      const limit: number = parseInt(query.limit!) || 50;
      const skip = (page - 1) * limit;

      const trial = await Trial.findOne({scout: query.userId, _id: query.trial})
      if (!trial) return { errors: [{message: "Trial not Found"}] };

      let Applicants = await TrialApplication.find({trial: query.trial}).skip(skip).limit(limit).sort({createdAt: -1})
      .populate({
        path: 'athlete',  // Path to populate
        model: 'UserAccount',  // Explicitly specifying the model is optional but sometimes necessary
        select: '-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt -accountType' 
      });

      if (query.status) {
        Applicants = await TrialApplication.find({trial: query.trial, status: query.status}).skip(skip).limit(limit).sort({createdAt: -1})
        .populate({
          path: 'athlete',  // Path to populate
          model: 'UserAccount',  // Explicitly specifying the model is optional but sometimes necessary
          select: '-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt -accountType' 
        });
      }
      
      const total = await TrialApplication.countDocuments({trial: query.trial, status: query.status})
      
      return { result: {
          trial,
          totalPages: Math.ceil(total / limit),
          currentPage: page,
          total,
          Applicants
      } };
    }

    public acceptApplicant = async (query: { trial: any, athleteId: any,  userId: any}) : Promise<{ errors?: ErrorInterface[]; result?: TrialDto | any }> => {   
      const trial = await this._trailModel.checkIfExist({scout: query.userId, _id: query.trial})
      if (!trial.status) return { errors: [{message: "Trial not Found"}] };

      const checkApplication = await this._trialApplicationModel.checkIfExist({trial: query.trial, athlete: query.athleteId})
      if (!checkApplication.status) return { errors: [{message: "This Athlete have not applied for this trial "}] };

      const acceptApplicant = await this._trialApplicationModel.update(checkApplication.data?._id!, {status: TrialApplicationStatus.Accepted})
      if (!acceptApplicant.status) return { errors: [{message: "Unable to accept application"}] };

      await this._notificationModel.create({
        user: query.athleteId,
        title: `Your application for ${trial.data?.name} has been accepted`,
        description: `Congratulation! You application for the ${trial.data?.name} on ${trial.data?.trialDate}, has been accepted. Please check your email for further details and preparation guidelines.`
      })
      
      return { result: {trial: trial.data?.getModel, application: checkApplication.data?.getModel} };
    }

    public rejectApplicant = async (query: { trial: any, athleteId: any,  userId: any}) : Promise<{ errors?: ErrorInterface[]; result?: TrialDto | any }> => {   
      const trial = await this._trailModel.checkIfExist({scout: query.userId, _id: query.trial})
      if (!trial.status) return { errors: [{message: "Trial not Found"}] };

      const checkApplication = await this._trialApplicationModel.checkIfExist({trial: query.trial, athlete: query.athleteId})
      if (!checkApplication.status) return { errors: [{message: "This Athlete have not applied for this trial "}] };

      const rejectApplicant = await this._trialApplicationModel.update(checkApplication.data?._id!, {status: TrialApplicationStatus.Rejected})
      if (!rejectApplicant.status) return { errors: [{message: "Unable to reject application"}] };

      await this._notificationModel.create({
        user: query.athleteId,
        title: `Your application for ${trial.data?.name} was rejected`,
        description: `Sorry! You application for the ${trial.data?.name} on ${trial.data?.trialDate}, has been rejected. Please check your email for further Info.`
      })
      
      return { result: {trial: trial.data?.getModel, application: checkApplication.data?.getModel} };
    }

    public getAthleteProfile = async (query: { athlete: any }) : Promise<{ errors?: ErrorInterface[]; result?: TrialDto | any }> => {   
      const athlete = await UserAccount.findOne({ _id: query.athlete })
      .select('-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt -accountType');
      if (!athlete) return { errors: [{message: "Athlete not Found"}] }
      
      return { result: {athlete: athlete} };
    }
}

export default TrialService;