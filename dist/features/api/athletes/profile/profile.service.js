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
const bocket_1 = __importDefault(require("../../../../shared/services/cloudinary/bocket"));
const index_1 = require("../../../../shared/services/database/athletes/auth/index");
class ProfileService {
    constructor({ authModel }) {
        this.getProfile = (user) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const profile = yield this._authModel.checkIfExist({ _id: user });
            if (!profile.status)
                return { errors: [{ message: "User not found" }] };
            return { result: (_a = profile.data) === null || _a === void 0 ? void 0 : _a.getSecureRespons };
        });
        this.editBio = (data) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { name, skill, position, city, country } = data.payload;
            const editBio = yield this._authModel.updateAccount(data.user, { name, skill, position, location: { city, country } });
            if (!editBio.status)
                return { errors: [{ message: "Unable to update Bio" }] };
            return { result: (_a = editBio.data) === null || _a === void 0 ? void 0 : _a.getSecureRespons };
        });
        this.editProfileImg = (data) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            if (!data.file && !((_a = data.file) === null || _a === void 0 ? void 0 : _a.buffer))
                return { errors: [{ message: "Profile image is required" }] };
            const uploadResult = yield new Promise((resolve, reject) => {
                const stream = bocket_1.default.uploader.upload_stream({ folder: "my_app_images" }, (error, result) => {
                    if (error || !result)
                        return { errors: [{ message: "unable to upload image" }] };
                    resolve({ url: result.secure_url });
                });
                stream.write(data.file.buffer);
                stream.end();
            });
            const profileImg = uploadResult.url;
            const editProfileImag = yield this._authModel.updateAccount(data.user, { profileImg });
            if (!editProfileImag.status)
                return { errors: [{ message: "Unable to update profile image" }] };
            return { result: (_b = editProfileImag.data) === null || _b === void 0 ? void 0 : _b.getSecureRespons };
        });
        this.editAbout = (data) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const editAbout = yield this._authModel.updateAccount(data.user, { about: data.about });
            if (!editAbout.status)
                return { errors: [{ message: "Unable to update about" }] };
            return { result: (_a = editAbout.data) === null || _a === void 0 ? void 0 : _a.getSecureRespons };
        });
        this.addAchievement = (data) => __awaiter(this, void 0, void 0, function* () {
            const newAchievement = Object.assign({}, data.achievement);
            const addAchievement = yield index_1.UserAccount.findByIdAndUpdate(data.user, { $push: { achievement: newAchievement } }, { new: true });
            if (!addAchievement)
                return { errors: [{ message: "Unable to add achievement" }] };
            return { result: newAchievement };
        });
        this.editAchievement = (data) => __awaiter(this, void 0, void 0, function* () {
            const { achievementId, title, sport, date, description } = data.achievement;
            const editAchievement = yield index_1.UserAccount.findOneAndUpdate({ _id: data.user, "achievement._id": achievementId }, {
                $set: {
                    "achievement.$.title": title,
                    "achievement.$.date": date,
                    "achievement.$.sport": sport,
                    "achievement.$.description": description,
                },
            }, { new: true });
            if (!editAchievement)
                return { errors: [{ message: "Unable to Update achievement" }] };
            return { result: data.achievement };
        });
        this.deleteAchievement = (data) => __awaiter(this, void 0, void 0, function* () {
            const deleteAchievement = yield index_1.UserAccount.findByIdAndUpdate(data.user, { $pull: { achievement: { _id: data.achievementId } } }, { new: true });
            if (!deleteAchievement)
                return { errors: [{ message: "Unable to delete achievement" }] };
            return { result: data.achievementId };
        });
        this.addExperience = (data) => __awaiter(this, void 0, void 0, function* () {
            const newExperience = Object.assign({}, data.experience);
            const addExperience = yield index_1.UserAccount.findByIdAndUpdate(data.user, { $push: { experience: newExperience } }, { new: true });
            if (!addExperience)
                return { errors: [{ message: "Unable to add experience" }] };
            return { result: newExperience };
        });
        this.editExperience = (data) => __awaiter(this, void 0, void 0, function* () {
            const { experienceId, title, sport, date, description } = data.experience;
            const editExperience = yield index_1.UserAccount.findOneAndUpdate({ _id: data.user, "experience._id": experienceId }, {
                $set: {
                    "experience.$.title": title,
                    "experience.$.date": date,
                    "experience.$.sport": sport,
                    "experience.$.description": description,
                },
            }, { new: true });
            if (!editExperience)
                return { errors: [{ message: "Unable to Update experience" }] };
            return { result: data.experience };
        });
        this.deleteExperience = (data) => __awaiter(this, void 0, void 0, function* () {
            const deleteExperience = yield index_1.UserAccount.findByIdAndUpdate(data.user, { $pull: { experience: { _id: data.experienceId } } }, { new: true });
            if (!deleteExperience)
                return { errors: [{ message: "Unable to delete experience" }] };
            return { result: data.experienceId };
        });
        this.addEducation = (data) => __awaiter(this, void 0, void 0, function* () {
            const newEducation = Object.assign({}, data.education);
            const addEducation = yield index_1.UserAccount.findByIdAndUpdate(data.user, { $push: { education: newEducation } }, { new: true });
            if (!addEducation)
                return { errors: [{ message: "Unable to add education" }] };
            return { result: newEducation };
        });
        this.editEducation = (data) => __awaiter(this, void 0, void 0, function* () {
            const { educationId, school, degree, field, startDate, endDate, description } = data.education;
            const editEducation = yield index_1.UserAccount.findOneAndUpdate({ _id: data.user, "education._id": educationId }, {
                $set: {
                    "education.$.school": school,
                    "education.$.degree": degree,
                    "education.$.field": field,
                    "education.$.startDate": startDate,
                    "education.$.endDate": endDate,
                    "education.$.description": description,
                },
            }, { new: true });
            if (!editEducation)
                return { errors: [{ message: "Unable to Update education" }] };
            return { result: data.education };
        });
        this.deleteEducation = (data) => __awaiter(this, void 0, void 0, function* () {
            const deleteEducation = yield index_1.UserAccount.findByIdAndUpdate(data.user, { $pull: { education: { _id: data.educationId } } }, { new: true });
            if (!deleteEducation)
                return { errors: [{ message: "Unable to delete education" }] };
            return { result: data.educationId };
        });
        this.addStatistic = (data) => __awaiter(this, void 0, void 0, function* () {
            const newStatistic = data.statistic;
            const addEducation = yield index_1.UserAccount.findByIdAndUpdate(data.user, { statistic: newStatistic }, { new: true });
            if (!addEducation)
                return { errors: [{ message: "Unable to add statistic" }] };
            return { result: newStatistic };
        });
        this._authModel = authModel;
    }
}
exports.default = ProfileService;
