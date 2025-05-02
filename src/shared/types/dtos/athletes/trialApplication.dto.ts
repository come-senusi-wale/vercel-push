import { Schema, Types } from "mongoose";
import { ITrialApplication, TrialApplicationStatus } from "../../interfaces/responses/athletes/trialApplication.rseponse";



class TrialApplicationDto implements ITrialApplication {
    public _id: string;
    public athlete: Schema.Types.ObjectId;
    trial: Schema.Types.ObjectId;
    public name: string;
    contactInfo: string;
    status: TrialApplicationStatus;
    document: string;
    position: string;
    public updatedAt?: Date;
    public createdAt?: Date;
    
    constructor(trialApplication: ITrialApplication) {
      this._id = trialApplication._id;
      this.athlete = trialApplication.athlete;
      this.trial = trialApplication.trial;
      this.name = trialApplication.name;
      this.contactInfo = trialApplication.contactInfo,
      this.status = trialApplication.status
      this.document = trialApplication.document,
      this.position = trialApplication.position,
      this.updatedAt = trialApplication.updatedAt;
      this.createdAt = trialApplication.createdAt;
    }
    get getModel() {
      return {
        _id: this._id,
        athlete: this.athlete,
        trial: this.athlete,
        name: this.name,
        contactInfo: this.contactInfo,
        status: this.status,
        document: this.document,
        position: this.position,
        updatedAt: this.updatedAt ? new Date(this.updatedAt): undefined,
        createdAt: this.createdAt ? new Date(this.createdAt): undefined,
      } as ITrialApplication
    }
}


export default TrialApplicationDto;