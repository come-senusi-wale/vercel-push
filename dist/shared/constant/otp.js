"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = generateOTP;
function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
}
