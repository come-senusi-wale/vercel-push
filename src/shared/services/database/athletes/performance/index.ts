import { Schema, model, PaginateModel } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
import { IPerformance, PerformanceVisibility } from "../../../../types/interfaces/responses/athletes/performance.response";
import IPerformanceModel from "./type";
import PerformanceDto from "../../../../types/dtos/athletes/performamnce.dto";


const PerformanceSchema = new Schema<IPerformance>({
    athlete: {
        type: Schema.Types.ObjectId, 
        ref: 'UserAccount',
        required: true, 
    },
    description: {
      type: String,
      required: true, 
    },
    visibility: {
        type: String,  
        enum: Object.values(PerformanceVisibility),  
        required: true, 
    },
    image: {
      type: [String],
      required: true, 
    },
    tag: {
      type: String,
      default: ""
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
  
  PerformanceSchema.plugin(mongoosePaginate);
  
  export const Performance = model<IPerformance, PaginateModel<IPerformance>>("Performances", PerformanceSchema)


  class  PerformanceModel implements  IPerformanceModel {
    Performance: typeof Performance;
      
    constructor() {
        this.Performance =  Performance;
    }
  
    create = async (details: Partial<IPerformance>) => {
        try {
            const data = await this.Performance.create(details);
            if (data) {
              return {status: true, data: new PerformanceDto(data)};
            } else {
              return {status: false, error: "Couldn't create performance"};
            }
        } catch (error) {
            return {status: false, error };
        }
    }
  
    checkIfExist = async (details: Partial<IPerformance>) => {
        try {
            const data = await this.Performance.findOne(details);
            if (data) {
              return {status: true, data: new PerformanceDto(data)};
            } else {
              return {status: false, error: "No Performance find"};
            }
        } catch (error) {
            return {status: false, error };
        }
    }
  
    update = async (id: string, details: Partial<IPerformance>) => {
      try {
          const data = await this.Performance.findOneAndUpdate({_id: id}, details, {new: true});
          if (data) {
            return {status: true, data: new PerformanceDto(data)};
          } else {
            return {status: false, error: "Unable to update performance"};
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
  
  export default PerformanceModel;