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
exports.uploadToS3 = exports.Uploader = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const uuid_1 = require("uuid");
class Uploader {
    constructor() {
        this.client = new client_s3_1.S3Client({
            region: 'eu-central-1',
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            },
        });
    }
    uploadFile(file) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            const key = (_a = (0, uuid_1.v4)()) !== null && _a !== void 0 ? _a : file.originalname;
            const params = {
                // Bucket: process.env.AWS_S3_BUCKET_NAME,
                Bucket: 'yawa-bucket',
                Key: key,
                Body: file.buffer,
                ContentType: file.mimetype,
            };
            try {
                const command = new client_s3_1.PutObjectCommand(params);
                yield this.client.send(command);
                // const url = `${process.env.AWS_S3_BUCKET_URL}/${key}`;
                const url = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
                return { url, type: file.mimetype.split('/')[0] };
            }
            catch (error) {
                console.error(error);
                throw new Error('Error uploading file');
            }
        });
    }
    uploadFiles(files) {
        return __awaiter(this, void 0, void 0, function* () {
            const uploadPromises = files.map(file => this.uploadFile(file));
            return Promise.all(uploadPromises);
        });
    }
}
exports.Uploader = Uploader;
const uploadToS3 = (buffer, originalFilename) => __awaiter(void 0, void 0, void 0, function* () {
    const s3 = new client_s3_1.S3Client({
        region: 'eu-central-1',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        },
    });
    const timestamp = Date.now().toString();
    const key = `${timestamp}-${originalFilename}`;
    const params = {
        Bucket: 'yawa-bucket',
        Key: key,
        Body: buffer,
        ContentType: 'image/jpeg',
        // ACL: 'public-read',
    };
    const command = new client_s3_1.PutObjectCommand(params);
    try {
        const response = yield s3.send(command);
        const fileLocation = `https://${params.Bucket}.s3.amazonaws.com/${params.Key}`;
        return { response, Location: fileLocation };
    }
    catch (error) {
        console.error('Error uploading to S3:', error);
        throw error;
    }
});
exports.uploadToS3 = uploadToS3;
