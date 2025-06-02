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
exports.Performance = void 0;
const mongoose_1 = require("mongoose");
const mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
const performance_response_1 = require("../../../../types/interfaces/responses/athletes/performance.response");
const performamnce_dto_1 = __importDefault(require("../../../../types/dtos/athletes/performamnce.dto"));
const PerformanceSchema = new mongoose_1.Schema({
    athlete: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'UserAccount',
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    visibility: {
        type: String,
        enum: Object.values(performance_response_1.PerformanceVisibility),
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
PerformanceSchema.plugin(mongoose_paginate_v2_1.default);
exports.Performance = (0, mongoose_1.model)("Performances", PerformanceSchema);
class PerformanceModel {
    constructor() {
        this.create = (details) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.Performance.create(details);
                if (data) {
                    return { status: true, data: new performamnce_dto_1.default(data) };
                }
                else {
                    return { status: false, error: "Couldn't create performance" };
                }
            }
            catch (error) {
                return { status: false, error };
            }
        });
        this.checkIfExist = (details) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.Performance.findOne(details);
                if (data) {
                    return { status: true, data: new performamnce_dto_1.default(data) };
                }
                else {
                    return { status: false, error: "No Performance find" };
                }
            }
            catch (error) {
                return { status: false, error };
            }
        });
        this.update = (id, details) => __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.Performance.findOneAndUpdate({ _id: id }, details, { new: true });
                if (data) {
                    return { status: true, data: new performamnce_dto_1.default(data) };
                }
                else {
                    return { status: false, error: "Unable to update performance" };
                }
            }
            catch (error) {
                return { status: false, error };
            }
        });
        this.Performance = exports.Performance;
    }
}
exports.default = PerformanceModel;
