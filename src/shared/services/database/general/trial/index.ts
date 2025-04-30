import { Schema, model, PaginateModel } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
import { ITrial } from "../../../../types/interfaces/responses/general/trial.response";
import ITrialModel from "./type";
import TrialDto from "../../../../types/dtos/general/trial.dto";


const TrialSchema = new Schema<ITrial>({
    name: {
      type: String,
      required: true
    },
    scout: {
      type: Schema.Types.ObjectId, 
      ref: 'UserAccount',
      required: true
    },
    trialType: {
        type: String,
        required: true,
    },
    organizerName: {
      type: String,
      required: true  
    },
    trialDate: {
      type: Date,
      required: true
    },
    registrationDeadline: {
      type: Date,
      required: true
    },
    location: {
        type: String,
        required: true
    },
    eligibility: {
        type: String,
        required: true,
    },
    skillLevel: {
        type: String
    },
    specificRequirement: {
        type: String
    },
    trialFees: {
        type: Number
    },
    free: {
        type: Boolean
    },
    refoundPolicy: {
        type: String
    },
    documentRequirement: {
        type: [String]
    },
    equipmentNeeded: {
        type: [String]
    },
    description: {
        type: String
    },
    file: {
        type: String
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  TrialSchema.plugin(mongoosePaginate);
  
  export const Trial = model<ITrial, PaginateModel<ITrial>>("Trials", TrialSchema)

  class  TrialModel implements  ITrialModel {
    Trial: typeof Trial;
    
    constructor() {
        this.Trial =  Trial;
    }

    create = async (details: Partial<ITrial>) => {
        try {
            const data = await this.Trial.create(details);
            if (data) {
              return {status: true, data: new TrialDto(data)};
            } else {
              return {status: false, error: "Couldn't create trial"};
            }
        } catch (error) {
            return {status: false, error };
        }
    }

    checkIfExist = async (details: Partial<ITrial>) => {
        try {
            const data = await this.Trial.findOne(details);
            if (data) {
              return {status: true, data: new TrialDto(data)};
            } else {
              return {status: false, error: "No Trial find"};
            }
        } catch (error) {
            return {status: false, error };
        }
    }

    update = async (id: string, details: Partial<ITrial>) => {
      try {
          const data = await this.Trial.findOneAndUpdate({_id: id}, details, {new: true});
          if (data) {
            return {status: true, data: new TrialDto(data)};
          } else {
            return {status: false, error: "Unable to update configuration"};
          }
      } catch (error) {
          return {status: false, error };
      }
    }


}

export default TrialModel;