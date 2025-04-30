import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserAccount } from "../../services/database/athletes/auth/index";
import { IAthletesAccount, AccountType } from "../../types/interfaces/responses/athletes/athlete.response";
import { TokenPayload } from '../../constant/token';


declare global {
    namespace Express {
      interface Request {
        user?: IAthletesAccount;
      }
    }
}

export const isScoutAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const token = req.headers.authorization?.split(' ')[1];
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - Token not provided' });
        }
        const decodedToken: any = jwt.verify(token, process.env.USER_JWT_SECRET!);
        const id = decodedToken.id;
        const email = decodedToken.email;
        const accountType = decodedToken.accountType;
  
        // Optionally, you can fetch the user from the database and attach it to the request
        const user = await UserAccount.findById(id);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }

        if (accountType != AccountType.Scout) {
            return res.status(401).json({ message: 'Unauthorized - Scout role' });
        }
        req.user = user;
        // req.userId = user._id;
  
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};


export const isAthleteAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // const token = req.headers.authorization?.split(' ')[1];
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized - Token not provided' });
        }
        const decodedToken: any = jwt.verify(token, process.env.USER_JWT_SECRET!);
        const id = decodedToken.id;
        const email = decodedToken.email;
        const accountType = decodedToken.accountType;
  
        // Optionally, you can fetch the user from the database and attach it to the request
        const user = await UserAccount.findById(id);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized - Invalid token' });
        }

        if (accountType != AccountType.Athlete) {
            return res.status(401).json({ message: 'Unauthorized - Athlete role' });
        }
        req.user = user;
        // req.userId = user._id;
  
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};