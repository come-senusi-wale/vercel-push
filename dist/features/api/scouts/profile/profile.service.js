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
            return { result: (_a = profile.data) === null || _a === void 0 ? void 0 : _a.getSecureResponse };
        });
        this.editBio = (data) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { name, title, position, city, country } = data.payload;
            const editBio = yield this._authModel.updateAccount(data.user, { name, title, position, location: { city, country } });
            if (!editBio.status)
                return { errors: [{ message: "Unable to update Bio" }] };
            return { result: (_a = editBio.data) === null || _a === void 0 ? void 0 : _a.getSecureResponse };
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
            return { result: (_b = editProfileImag.data) === null || _b === void 0 ? void 0 : _b.getSecureResponse };
        });
        this.editAbout = (data) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const editAbout = yield this._authModel.updateAccount(data.user, { about: data.about });
            if (!editAbout.status)
                return { errors: [{ message: "Unable to update about" }] };
            return { result: (_a = editAbout.data) === null || _a === void 0 ? void 0 : _a.getSecureResponse };
        });
        this.addSport = (data) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const user = yield index_1.UserAccount.findById(data.user);
            if (!user)
                return { errors: [{ message: "User not found" }] };
            const updatedSports = Array.from(new Set([...user.sports, ...data.newSports])); // remove duplicates
            const updateSport = yield this._authModel.updateAccount(data.user, { sports: updatedSports });
            if (!updateSport.status)
                return { errors: [{ message: "Unable to update Sport" }] };
            return { result: (_a = updateSport.data) === null || _a === void 0 ? void 0 : _a.getSecureResponse };
        });
        this.deleteSport = (data) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const user = yield index_1.UserAccount.findById(data.user);
            if (!user)
                return { errors: [{ message: "User not found" }] };
            const remainingSport = user.sports.filter(sport => !data.sportsToRemove.includes(sport));
            const updateSport = yield this._authModel.updateAccount(data.user, { sports: remainingSport });
            if (!updateSport.status)
                return { errors: [{ message: "Unable to update Sport" }] };
            return { result: (_a = updateSport.data) === null || _a === void 0 ? void 0 : _a.getSecureResponse };
        });
        this.addLookFor = (data) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const user = yield index_1.UserAccount.findById(data.user);
            if (!user)
                return { errors: [{ message: "User not found" }] };
            const updatedLookFor = Array.from(new Set([...user.lookFor, ...data.newLookFor])); // remove duplicates
            const updateLookFor = yield this._authModel.updateAccount(data.user, { lookFor: updatedLookFor });
            if (!updateLookFor.status)
                return { errors: [{ message: "Unable to update data" }] };
            return { result: (_a = updateLookFor.data) === null || _a === void 0 ? void 0 : _a.getSecureResponse };
        });
        this.deleteLookFor = (data) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const user = yield index_1.UserAccount.findById(data.user);
            if (!user)
                return { errors: [{ message: "User not found" }] };
            const remainingLookFor = user.lookFor.filter(sport => !data.lookForToRemove.includes(sport));
            const updateLookFor = yield this._authModel.updateAccount(data.user, { lookFor: remainingLookFor });
            if (!updateLookFor.status)
                return { errors: [{ message: "Unable to update data" }] };
            return { result: (_a = updateLookFor.data) === null || _a === void 0 ? void 0 : _a.getSecureResponse };
        });
        this._authModel = authModel;
    }
}
exports.default = ProfileService;
