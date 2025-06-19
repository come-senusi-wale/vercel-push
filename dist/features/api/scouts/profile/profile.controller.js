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
Object.defineProperty(exports, "__esModule", { value: true });
class ProfileController {
    constructor({ profileService }) {
        this.getProfile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { result, errors } = yield this._ProfileService.getProfile(userId);
            if (errors && errors.length > 0)
                return res.status(401).json({
                    error: errors,
                    code: 401,
                    status: false
                });
            if (result === null)
                return res.status(401).json({
                    code: 401,
                    status: false
                });
            return res.status(201).json({
                data: result,
                code: 201,
                status: true
            });
        });
        this.editBio = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const body = req.body;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { result, errors } = yield this._ProfileService.editBio({ user: userId, payload: body });
            if (errors && errors.length > 0)
                return res.status(401).json({
                    error: errors,
                    code: 401,
                    status: false
                });
            if (result === null)
                return res.status(401).json({
                    code: 401,
                    status: false
                });
            return res.status(201).json({
                data: result,
                code: 201,
                status: true
            });
        });
        this.editProfileImg = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const file = req.file;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { result, errors } = yield this._ProfileService.editProfileImg({ user: userId, file: file });
            if (errors && errors.length > 0)
                return res.status(401).json({
                    error: errors,
                    code: 401,
                    status: false
                });
            if (result === null)
                return res.status(401).json({
                    code: 401,
                    status: false
                });
            return res.status(201).json({
                data: result,
                code: 201,
                status: true
            });
        });
        this.editAbout = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { about } = req.body;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { result, errors } = yield this._ProfileService.editAbout({ user: userId, about: about });
            if (errors && errors.length > 0)
                return res.status(401).json({
                    error: errors,
                    code: 401,
                    status: false
                });
            if (result === null)
                return res.status(401).json({
                    code: 401,
                    status: false
                });
            return res.status(201).json({
                data: result,
                code: 201,
                status: true
            });
        });
        this.addSport = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { newSports } = req.body;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { result, errors } = yield this._ProfileService.addSport({ user: userId, newSports });
            if (errors && errors.length > 0)
                return res.status(401).json({
                    error: errors,
                    code: 401,
                    status: false
                });
            if (result === null)
                return res.status(401).json({
                    code: 401,
                    status: false
                });
            return res.status(201).json({
                data: result,
                code: 201,
                status: true
            });
        });
        this.deleteSport = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { sportsToRemove } = req.body;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { result, errors } = yield this._ProfileService.deleteSport({ user: userId, sportsToRemove });
            if (errors && errors.length > 0)
                return res.status(401).json({
                    error: errors,
                    code: 401,
                    status: false
                });
            if (result === null)
                return res.status(401).json({
                    code: 401,
                    status: false
                });
            return res.status(201).json({
                data: result,
                code: 201,
                status: true
            });
        });
        this.addLookFor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { newLookFor } = req.body;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { result, errors } = yield this._ProfileService.addLookFor({ user: userId, newLookFor });
            if (errors && errors.length > 0)
                return res.status(401).json({
                    error: errors,
                    code: 401,
                    status: false
                });
            if (result === null)
                return res.status(401).json({
                    code: 401,
                    status: false
                });
            return res.status(201).json({
                data: result,
                code: 201,
                status: true
            });
        });
        this.deleteLookFor = (req, res) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const { lookForToRemove } = req.body;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { result, errors } = yield this._ProfileService.deleteLookFor({ user: userId, lookForToRemove });
            if (errors && errors.length > 0)
                return res.status(401).json({
                    error: errors,
                    code: 401,
                    status: false
                });
            if (result === null)
                return res.status(401).json({
                    code: 401,
                    status: false
                });
            return res.status(201).json({
                data: result,
                code: 201,
                status: true
            });
        });
        this._ProfileService = profileService;
    }
}
exports.default = ProfileController;
