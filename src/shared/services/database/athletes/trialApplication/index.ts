import { Schema, model, PaginateModel } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
import { ITrialApplication, TrialApplicationStatus } from "../../../../types/interfaces/responses/athletes/trialApplication.rseponse";
import ITrialApplcationModel from "./type";
import TrialApplicationDto from "../../../../types/dtos/athletes/trialApplication.dto";


const TrialApplicationSchema = new Schema<ITrialApplication>({
    trial: {
      type: Schema.Types.ObjectId,
      ref: 'Trials', 
      required: true, 
    },
    athlete: {
        type: Schema.Types.ObjectId, 
        ref: 'UserAccount',
        required: true, 
    },
    status: {
      type: String,  
      enum: Object.values(TrialApplicationStatus),  
      required: true, 
      
    },
    name: {
      type: String,
      required: true, 
    },
    contactInfo: {
      type: String,
      required: true, 
    },
    position: {
      type: String,
      required: true, 
    },
    document: {
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
  
  TrialApplicationSchema.plugin(mongoosePaginate);
  
  export const TrialApplication = model<ITrialApplication, PaginateModel<ITrialApplication>>("TrialApplication", TrialApplicationSchema)

  class  TrialApplicationModel implements  ITrialApplcationModel {
    TrialApplication: typeof TrialApplication;
      
    constructor() {
        this.TrialApplication =  TrialApplication;
    }
  
    create = async (details: Partial<ITrialApplication>) => {
        try {
            const data = await this.TrialApplication.create(details);
            if (data) {
              return {status: true, data: new TrialApplicationDto(data)};
            } else {
              return {status: false, error: "Couldn't create trial"};
            }
        } catch (error) {
            return {status: false, error };
        }
    }
  
    checkIfExist = async (details: Partial<ITrialApplication>) => {
        try {
            const data = await this.TrialApplication.findOne(details);
            if (data) {
              return {status: true, data: new TrialApplicationDto(data)};
            } else {
              return {status: false, error: "No Trial find"};
            }
        } catch (error) {
            return {status: false, error };
        }
    }
  
    update = async (id: string, details: Partial<ITrialApplication>) => {
      try {
          const data = await this.TrialApplication.findOneAndUpdate({_id: id}, details, {new: true});
          if (data) {
            return {status: true, data: new TrialApplicationDto(data)};
          } else {
            return {status: false, error: "Unable to update configuration"};
          }
      } catch (error) {
          return {status: false, error };
      }
    }
  
    // getAll = async (details: Partial<ITrial>, option: { page: number, limit: number }) => {
    //   try {
    //     const data = await this.Trial.paginate(details, {...option, sort: {createdAt: -1}});
    //     if (data) {
    //       return {status: true,
    //         data: new MultipleTrialDto({
    //           trials : data.docs,
    //           totalTrial: data.totalDocs,
    //           hasNextPage: data.hasNextPage
    //       })};
    //     } else {
    //       return {status: false, error: "Unable to update configuration"};
    //     }
    //   } catch (error) {
    //       return {status: false, error };
    //   }
    // }
  
  
  }
  
  export default TrialApplicationModel;