import { Schema, Types } from "mongoose";
import { ITrial, TrialStatus } from "../../interfaces/responses/general/trial.response";

export interface IMultipleTrialResponse {
  trials: ITrial[];
  totalTrial: number,
  hasNextPage: boolean
}


class TrialDto implements ITrial {
    public _id: string;
    public scout: Schema.Types.ObjectId;
    public name: string;
    public trialType: string;
    public organizerName: string;
    public trialDate: Date;
    public registrationDeadline: Date;
    public location: string;
    public eligibility: string;
    public skillLevel: string;
    public specificRequirement: string;
    public trialFees: number;
    public free: boolean;
    public refoundPolicy: string;
    public documentRequirement: string[];
    public equipmentNeeded: string[];
    public description: string;
    public file?: string;
    maximumAttendance?: string;
    status: TrialStatus;
    public updatedAt?: Date;
    public createdAt?: Date;
    
    constructor(trial: ITrial) {
      this._id = trial._id;
      this.scout = trial.scout;
      this.name = trial.name;
      this.trialType = trial.trialType,
      this.organizerName = trial.organizerName,
      this.trialDate = trial.trialDate,
      this.registrationDeadline = trial.registrationDeadline,
      this.location = trial.location,
      this.eligibility = trial.eligibility,
      this.skillLevel = trial.skillLevel,
      this.specificRequirement = trial.specificRequirement,
      this.trialFees = trial.trialFees,
      this.free = trial.free,
      this.refoundPolicy = trial.refoundPolicy,
      this.documentRequirement = trial.documentRequirement,
      this.equipmentNeeded = trial.equipmentNeeded,
      this.description = trial.description,
      this.file = trial.file
      this.maximumAttendance = trial.maximumAttendance,
      this.status = trial.status
      this.updatedAt = trial.updatedAt;
      this.createdAt = trial.createdAt;
    }
    get getModel() {
      return {
        _id: this._id,
        scout: this.scout,
        name: this.name,
        trialType: this.trialType,
        organizerName: this.organizerName,
        trialDate: this.trialDate,
        registrationDeadline: this.registrationDeadline,
        location: this.location,
        eligibility: this.eligibility,
        skillLevel: this.skillLevel,
        specificRequirement: this.specificRequirement,
        trialFees: this.trialFees,
        free: this.free,
        refoundPolicy: this.refoundPolicy,
        documentRequirement: this.documentRequirement,
        equipmentNeeded: this.equipmentNeeded,
        description: this.description,
        file: this.file,
        maximumAttendance: this.maximumAttendance,
        status: this.status,
        updatedAt: this.updatedAt ? new Date(this.updatedAt): undefined,
        createdAt: this.createdAt ? new Date(this.createdAt): undefined,
      } as ITrial
    }
}

export class MultipleTrialDto implements IMultipleTrialResponse {
  trials: TrialDto[];
  totalTrial: number;
  hasNextPage: boolean;

  constructor (multipleTrial: IMultipleTrialResponse) {
    this.trials = multipleTrial.trials.map((trial) => new TrialDto(trial));
    this.totalTrial = multipleTrial.totalTrial;
    this.hasNextPage = multipleTrial.hasNextPage;
  }

  get getResponse() {
    return {
      trials: this.trials.map((trial) => trial.getModel ),
      totalTrial: this.totalTrial,
      hasNextPage: this.hasNextPage
    } as IMultipleTrialResponse;
  }
}

export default TrialDto;