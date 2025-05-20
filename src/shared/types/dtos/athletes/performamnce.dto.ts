import { Schema, Types } from "mongoose";
import { IPerformance, PerformanceVisibility } from "../../interfaces/responses/athletes/performance.response";



class PerformanceDto implements IPerformance {
    public _id: string;
    public athlete: Schema.Types.ObjectId;
    description: string;
    visibility: PerformanceVisibility;
    image: string[];
    tag?: string ;
    public updatedAt?: Date;
    public createdAt?: Date;
    
    constructor(performance: IPerformance) {
      this._id = performance._id;
      this.athlete = performance.athlete;
      this.description = performance.description;
      this.visibility = performance.visibility;
      this.image = performance.image;
      this.tag = performance.tag;
      this.updatedAt = performance.updatedAt;
      this.createdAt = performance.createdAt;
    }
    get getModel() {
      return {
        _id: this._id,
        athlete: this.athlete,
        description: this.description,
        visibility: this.visibility,
        image: this.image,
        tag: this.tag,
        updatedAt: this.updatedAt ? new Date(this.updatedAt): undefined,
        createdAt: this.createdAt ? new Date(this.createdAt): undefined,
      } as IPerformance
    }
}


export default PerformanceDto;