"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateToken(payload) {
    const tokenPayload = {
        id: payload.id,
        email: payload.email,
        accountType: payload.accountType,
    };
    return jsonwebtoken_1.default.sign(tokenPayload, process.env.USER_JWT_SECRET);
}
