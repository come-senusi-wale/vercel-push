"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TrialApplicationDto {
    constructor(trialApplication) {
        this._id = trialApplication._id;
        this.athlete = trialApplication.athlete;
        this.trial = trialApplication.trial;
        this.name = trialApplication.name;
        this.contactInfo = trialApplication.contactInfo,
            this.status = trialApplication.status;
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
            updatedAt: this.updatedAt ? new Date(this.updatedAt) : undefined,
            createdAt: this.createdAt ? new Date(this.createdAt) : undefined,
        };
    }
}
exports.default = TrialApplicationDto;
