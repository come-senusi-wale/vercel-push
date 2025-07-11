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
exports.sendEmail = void 0;
const SibApiV3Sdk = require('sib-api-v3-sdk');
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;
const sendEmail = (to, subject, htmlContent) => __awaiter(void 0, void 0, void 0, function* () {
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = {
        to: [{ email: to }],
        // sender: { email: 'communicationsyawa@gmail.com', name: 'Yawa' },
        sender: { email: 'confluenxe@gmail.com', name: 'confluenxe' },
        // sender: { email: 'akinyemisaheedwale@gmail.com', name: 'wale' },
        subject: subject,
        htmlContent: htmlContent,
    };
    try {
        const response = yield apiInstance.sendTransacEmail(sendSmtpEmail);
        return response;
    }
    catch (error) {
        console.error('Brevo Email Error:', error);
        throw error;
    }
});
exports.sendEmail = sendEmail;
