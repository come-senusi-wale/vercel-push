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
const ERROR_TO_SAVE_ADMIN = {
    message: 'unable to create admin',
};
class AuthService {
    constructor({ adminModel, auth }) {
        this.registerAdmin = (email, password) => __awaiter(this, void 0, void 0, function* () {
            // const hashPassword = this._auth.encryptPassword(password)
            // const response = await this._adminModel.saveUserToDB({emailAddress: email, password: hashPassword});
            // if (!response.data) return { errors: [ERROR_TO_SAVE_ADMIN] };
            // const accessToken = this._auth.encryptToken(response.data.getUserForToken, TokenType.accessToken);
            // response.data.accessToken = accessToken;
            // return { admin: response.data };
            return { admin: "" };
        });
        this._adminModel = adminModel;
        this._auth = auth;
    }
}
exports.default = AuthService;
