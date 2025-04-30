import ErrorInterface from "../../../../shared/types/interfaces/responses/error";
import ITrailModel from "../../../../shared/services/database/general/trial/type";
import TrialDto from "../../../../shared/types/dtos/general/trial.dto";
import { ICreateTrialRequest } from "../../../../shared/types/interfaces/requests/scouts/trial.request";
import { v4 as uuidv4 } from "uuid";
import { uploadToS3 } from "../../../../shared/services/aws/s3";


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

        if (file) {
            const filename = uuidv4();
            const result = await uploadToS3(file.buffer, `${filename}.jpg`);
            trialFile = result?.Location!;
        } 

        let trialPayload = {
            scout: userId,
            file: trialFile,
            ...trial,
        }

        const createTrial = await this._trailModel.create(trialPayload);
        if (!createTrial.status) return { errors: [{message: createTrial.error}] };
   
   
        return { trial: createTrial.data?.getModel };
    }
}

export default TrialService;