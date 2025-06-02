import ErrorInterface from "../../../../shared/types/interfaces/responses/error";
import IUserModel from "../../../../shared/services/database/athletes/auth/type";
import { UserAccount } from "../../../../shared/services/database/athletes/auth/index";
import UserDto from "../../../../shared/types/dtos/athletes/athlete.dto";
import { AccountStatus, AccountType } from "../../../../shared/types/interfaces/responses/athletes/athlete.response";
import { Performance } from "../../../../shared/services/database/athletes/performance/index";
import { ScoutSearchType } from "../../../../shared/types/interfaces/requests/scouts/trial.request";
import { Trial } from "../../../../shared/services/database/general/trial/index";


class AthleteService {
    private _userModel: IUserModel;
    
    constructor (
      { userModel } : {
        userModel: IUserModel;
      }){
        this._userModel = userModel;
    }
  
    public getAllAthlete = async (query: { page?: string, limit?: string}) : Promise<{ errors?: ErrorInterface[]; result?: UserDto | any }> => {
        const page: number = parseInt(query.page!) || 1; // or get from query params
        const limit: number = parseInt(query.limit!) || 50;
        const skip = (page - 1) * limit;

        const athletes = await UserAccount.find({accountType: AccountType.Athlete}).skip(skip).limit(limit).sort({createdAt: -1})
        .select('-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt')
      
        const total = await UserAccount.countDocuments({accountType: AccountType.Athlete})
          
        return { result: {
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total,
            athletes
        } };

    }

    public getAllAthleteByStatus = async (query: { page?: string, limit?: string, status: AccountStatus}) : Promise<{ errors?: ErrorInterface[]; result?: UserDto | any }> => {
        const page: number = parseInt(query.page!) || 1; // or get from query params
        const limit: number = parseInt(query.limit!) || 50;
        const skip = (page - 1) * limit;

        const athletes = await UserAccount.find({accountType: AccountType.Athlete, accountStatus: query.status}).skip(skip).limit(limit).sort({createdAt: -1})
        .select('-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt')
      
        const total = await UserAccount.countDocuments({accountType: AccountType.Athlete, accountStatus: query.status})
          
        return { result: {
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total,
            athletes
        } };

    }

    public getSingleAthlete = async (query : {athlete: any}) : Promise<{ errors?: ErrorInterface[]; result?: UserDto | any }> => {
        const athlete = await this._userModel.checkIfExist({_id: query.athlete, accountType: AccountType.Athlete})
        if (!athlete.status) return { errors: [{message: "Athlete not found"}] };

        const performance= await Performance.find({athlete: query.athlete}).limit(20).sort({createdAt: -1})

        return { result: {athlete, performance}};

    }

    public search = async (query: { page?: string, limit?: string, name?: string, email?: string, sport?: string, position?: string, }) : Promise<{ errors?: ErrorInterface[]; result?: UserDto | any }> => {
        const filter: any = {};

        const page: number = parseInt(query.page!) || 1; // or get from query params
        const limit: number = parseInt(query.limit!) || 50;
        const skip = (page - 1) * limit;

        // OR logic: build conditions dynamically
        const orConditions: any[] = [];
        orConditions.push({ accountType: AccountType.Athlete });
        

        // Case-insensitive partial match for name
        if (query.name) {
            filter.name = { $regex: query.name, $options: 'i' };
        }

        if (query.email) {
            // filter.trialType = query.type;
            orConditions.push({ email: { $regex: query.sport, $options: 'i' } });
        }


        if (query.sport) {
            // filter.location = query.location;
            orConditions.push({ skill: { $regex: query.sport, $options: 'i' } });
        }

        if (query.position) {
            // filter.eligibility = query.eligibility;
            orConditions.push({ position: { $regex: query.position, $options: 'i' } });
        }

        if (orConditions.length > 1) {
            filter.$or = orConditions;
        }

        let result: any = await UserAccount.find(filter).skip(skip).limit(limit).sort({createdAt: -1});
        let total = await UserAccount.countDocuments(filter)


        return { result: {
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total,
            result
        } };
    }
}

export default AthleteService;