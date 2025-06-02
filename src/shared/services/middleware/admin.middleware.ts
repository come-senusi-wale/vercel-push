import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AdminAccount } from "../../services/database/admin/auth/index";
import { IAdminAccount } from "../../types/interfaces/responses/admin/admin.response";
import { AdminTokenPayload } from '../../constant/adminToken';


declare global {
    namespace Express {
      interface Request {
        admin?: IAdminAccount;
      }
    }
}

export const isAdminAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const token = req.headers.authorization?.split(' ')[1];
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - Token not provided' });
        }
        const decodedToken: any = jwt.verify(token, process.env.ADMIN_JWT_SECRET!);
        const id = decodedToken.id;
        const email = decodedToken.email;
  
        // Optionally, you can fetch the user from the database and attach it to the request
        const admin = await AdminAccount.findById(id);
        if (!admin) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }
        
        req.admin = admin;
  
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};