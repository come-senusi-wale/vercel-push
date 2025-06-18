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
exports.isAgentAdminAuthenticated = exports.isManagerAdminAuthenticated = exports.isSuperAdminAuthenticated = exports.isAdminAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = require("../../services/database/admin/auth/index");
const admin_response_1 = require("../../types/interfaces/responses/admin/admin.response");
const isAdminAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - Token not provided' });
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.ADMIN_JWT_SECRET);
        const id = decodedToken.id;
        const email = decodedToken.email;
        // Optionally, you can fetch the user from the database and attach it to the request
        const admin = yield index_1.AdminAccount.findById(id);
        if (!admin) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }
        req.admin = admin;
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.isAdminAuthenticated = isAdminAuthenticated;
const isSuperAdminAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - Token not provided' });
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.ADMIN_JWT_SECRET);
        const id = decodedToken.id;
        const email = decodedToken.email;
        const role = decodedToken.role;
        // Optionally, you can fetch the user from the database and attach it to the request
        const admin = yield index_1.AdminAccount.findById(id);
        if (!admin) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }
        if (role != admin_response_1.AdminRole.SuperAdmin) {
            return res.status(401).json({ message: 'Unauthorized - Super Admin role' });
        }
        req.admin = admin;
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.isSuperAdminAuthenticated = isSuperAdminAuthenticated;
const isManagerAdminAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - Token not provided' });
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.ADMIN_JWT_SECRET);
        const id = decodedToken.id;
        const email = decodedToken.email;
        const role = decodedToken.role;
        // Optionally, you can fetch the user from the database and attach it to the request
        const admin = yield index_1.AdminAccount.findById(id);
        if (!admin) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }
        if (role != admin_response_1.AdminRole.ContentManager) {
            return res.status(401).json({ message: 'Unauthorized - Content Manager role' });
        }
        req.admin = admin;
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.isManagerAdminAuthenticated = isManagerAdminAuthenticated;
const isAgentAdminAuthenticated = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - Token not provided' });
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, process.env.ADMIN_JWT_SECRET);
        const id = decodedToken.id;
        const email = decodedToken.email;
        const role = decodedToken.role;
        // Optionally, you can fetch the user from the database and attach it to the request
        const admin = yield index_1.AdminAccount.findById(id);
        if (!admin) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }
        if (role != admin_response_1.AdminRole.SupportAgent) {
            return res.status(401).json({ message: 'Unauthorized - Support Agent role' });
        }
        req.admin = admin;
        next();
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.isAgentAdminAuthenticated = isAgentAdminAuthenticated;
