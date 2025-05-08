"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PerformanceDto {
    constructor(performance) {
        this._id = performance._id;
        this.athlete = performance.athlete;
        this.description = performance.description;
        this.visibility = performance.visibility;
        this.image = performance.image;
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
            updatedAt: this.updatedAt ? new Date(this.updatedAt) : undefined,
            createdAt: this.createdAt ? new Date(this.createdAt) : undefined,
        };
    }
}
exports.default = PerformanceDto;
