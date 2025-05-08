"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultipleTrialDto = void 0;
class TrialDto {
    constructor(trial) {
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
            this.file = trial.file;
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
            updatedAt: this.updatedAt ? new Date(this.updatedAt) : undefined,
            createdAt: this.createdAt ? new Date(this.createdAt) : undefined,
        };
    }
}
class MultipleTrialDto {
    constructor(multipleTrial) {
        this.trials = multipleTrial.trials.map((trial) => new TrialDto(trial));
        this.totalTrial = multipleTrial.totalTrial;
        this.hasNextPage = multipleTrial.hasNextPage;
    }
    get getResponse() {
        return {
            trials: this.trials.map((trial) => trial.getModel),
            totalTrial: this.totalTrial,
            hasNextPage: this.hasNextPage
        };
    }
}
exports.MultipleTrialDto = MultipleTrialDto;
exports.default = TrialDto;
