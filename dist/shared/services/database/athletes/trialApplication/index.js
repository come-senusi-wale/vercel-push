"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrialApplication = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const trialApplication_rseponse_1 = require("../../../../types/interfaces/responses/athletes/trialApplication.rseponse");
const trialApplication_dto_1 = __importDefault(require("../../../../types/dtos/athletes/trialApplication.dto"));
const TrialApplicationSchema = new mongoose_1.Schema({
    trial: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Trials',
        required: true,
    },
    athlete: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'UserAccount',
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(trialApplication_rseponse_1.TrialApplicationStatus),
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
TrialApplicationSchema.plugin(mongoose_paginate_v2_1.default);
exports.TrialApplication = (0, mongoose_1.model)("TrialApplication", TrialApplicationSchema);
class TrialApplicationModel {
    constructor() {
        this.create = (details) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.TrialApplication.create(details);
                if (data) {
                    return { status: true, data: new trialApplication_dto_1.default(data) };
                }
                else {
                    return { status: false, error: "Couldn't create trial" };
                }
            }
            catch (error) {
                return { status: false, error };
            }
        });
        this.checkIfExist = (details) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.TrialApplication.findOne(details);
                if (data) {
                    return { status: true, data: new trialApplication_dto_1.default(data) };
                }
                else {
                    return { status: false, error: "No Trial find" };
                }
            }
            catch (error) {
                return { status: false, error };
            }
        });
        this.update = (id, details) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.TrialApplication.findOneAndUpdate({ _id: id }, details, { new: true });
                if (data) {
                    return { status: true, data: new trialApplication_dto_1.default(data) };
                }
                else {
                    return { status: false, error: "Unable to update configuration" };
                }
            }
            catch (error) {
                return { status: false, error };
            }
        });
        this.TrialApplication = exports.TrialApplication;
    }
}
exports.default = TrialApplicationModel;
