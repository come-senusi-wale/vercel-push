"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.Trial = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const trial_response_1 = require("../../../../types/interfaces/responses/general/trial.response");
const trial_dto_1 = __importStar(require("../../../../types/dtos/general/trial.dto"));
const TrialSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    scout: {
        type: mongoose_1.Schema.Types.ObjectId,
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
    maximumAttendance: {
        type: String
    },
    status: {
        type: String,
        enum: Object.values(trial_response_1.TrialStatus),
        default: trial_response_1.TrialStatus.Open,
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
TrialSchema.plugin(mongoose_paginate_v2_1.default);
exports.Trial = (0, mongoose_1.model)("Trials", TrialSchema);
class TrialModel {
    constructor() {
        this.create = (details) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.Trial.create(details);
                if (data) {
                    return { status: true, data: new trial_dto_1.default(data) };
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
                const data = yield this.Trial.findOne(details);
                if (data) {
                    return { status: true, data: new trial_dto_1.default(data) };
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
                const data = yield this.Trial.findOneAndUpdate({ _id: id }, details, { new: true });
                if (data) {
                    return { status: true, data: new trial_dto_1.default(data) };
                }
                else {
                    return { status: false, error: "Unable to update configuration" };
                }
            }
            catch (error) {
                return { status: false, error };
            }
        });
        this.getAll = (details, option) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.Trial.paginate(details, Object.assign(Object.assign({}, option), { sort: { createdAt: -1 } }));
                if (data) {
                    return { status: true,
                        data: new trial_dto_1.MultipleTrialDto({
                            trials: data.docs,
                            totalTrial: data.totalDocs,
                            hasNextPage: data.hasNextPage
                        }) };
                }
                else {
                    return { status: false, error: "Unable to update configuration" };
                }
            }
            catch (error) {
                return { status: false, error };
            }
        });
        this.Trial = exports.Trial;
    }
}
exports.default = TrialModel;
