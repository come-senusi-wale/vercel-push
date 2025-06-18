"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAdminToken = generateAdminToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateAdminToken(payload) {
    const tokenPayload = {
        id: payload.id,
        email: payload.email,
        role: payload.role
    };
    return jsonwebtoken_1.default.sign(tokenPayload, process.env.ADMIN_JWT_SECRET);
}
