import ErrorInterface from "../../../../shared/types/interfaces/responses/error";
import IUserModel from "../../../../shared/services/database/athletes/auth/type";
import { UserAccount } from "../../../../shared/services/database/athletes/auth/index";
import UserDto from "../../../../shared/types/dtos/athletes/athlete.dto";
import { AccountType } from "../../../../shared/types/interfaces/responses/athletes/athlete.response";
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
  
    public getAllAthlete = async (query : {number: any}) : Promise<{ errors?: ErrorInterface[]; result?: UserDto | any }> => {
        const filters = {
            accountType: AccountType.Athlete,           // or any value from your AccountType enum
            emailVerified: true               // or false
          };
          
          const pipeline = [
            { $match: filters },
            { $sample: { size: parseInt(query.number) } },
            {
                $project: {
                  password: 0,
                  emailOtp: 0,
                  passwordOtp: 0,
                  emailOtpCreatedAt: 0,
                  passwordOtpCreatedAt: 0
                }
            }
          ];
          
          const randomFilteredUsers = await UserAccount.aggregate(pipeline);
   

        return { result: randomFilteredUsers};

    }

    public getSingleAthlete = async (query : {athlete: any}) : Promise<{ errors?: ErrorInterface[]; result?: UserDto | any }> => {
        const athlete = await this._userModel.checkIfExist({_id: query.athlete, accountType: AccountType.Athlete})
        if (!athlete.status) return { errors: [{message: "Athlete not found"}] };

        const performance= await Performance.find({athlete: query.athlete}).limit(20).sort({createdAt: -1})

        return { result: {athlete, performance}};

    }

    public search = async (query: { category?: ScoutSearchType, page?: string, limit?: string, name?: string, location?: string, type?: string, eligibility?: string, }) : Promise<{ errors?: ErrorInterface[]; result?: UserDto | any }> => {
        const filter: any = {};

        const page: number = parseInt(query.page!) || 1; // or get from query params
        const limit: number = parseInt(query.limit!) || 50;
        const skip = (page - 1) * limit;

        // OR logic: build conditions dynamically
        const orConditions: any[] = [];
        orConditions.push({ accountType: AccountType.Athlete });
        

        // Case-insensitive partial match for name
        if (query.name) {
            // filter.name = { $regex: query.name, $options: 'i' };
            orConditions.push({ name: { $regex: query.name, $options: 'i' } });
        }

        if (query.type) {
            // filter.trialType = query.type;
            orConditions.push({ trialType: query.type });
        }


        if (query.location) {
            orConditions.push({ 'location.country': { $regex: query.location, $options: 'i' } });
            orConditions.push({ 'location.city': { $regex: query.location, $options: 'i' } });
        }

        if (query.eligibility) {
            // filter.eligibility = query.eligibility;
            orConditions.push({ eligibility: { $regex: query.eligibility, $options: 'i' } });
        }

        if (orConditions.length > 1) {
            filter.$or = orConditions;
        }

        let result: any = {}

        if (query.category == ScoutSearchType.Trial) {
            const trials = await Trial.find(filter).skip(skip).limit(limit).sort({createdAt: -1});
            const totalTrial = await Trial.countDocuments(filter)

            result = {
                trial: {
                    totalPages: Math.ceil(totalTrial / limit),
                    currentPage: page,
                    total: totalTrial,
                    trials: trials
                }
            }
        }else if (query.category == ScoutSearchType.Athlete){
            const athletes = await UserAccount.find(filter).skip(skip).limit(limit).sort({createdAt: -1});
            const totalAthlete = await UserAccount.countDocuments(filter)

            result = {
                athlete: {
                    totalPages: Math.ceil(totalAthlete / limit),
                    currentPage: page,
                    total: totalAthlete,
                    athletes: athletes
                },
            }
        }else{
            const athletes: any = await UserAccount.find(filter).skip(skip).limit(limit).sort({createdAt: -1})
            .select('-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt');
            const totalAthlete = await UserAccount.countDocuments(filter)

            const trials = await Trial.find(filter).skip(skip).limit(limit).sort({createdAt: -1});
            const totalTrial = await Trial.countDocuments(filter)

            result = {
                athlete: {
                    totalPages: Math.ceil(totalAthlete / limit),
                    currentPage: page,
                    total: totalAthlete,
                    athletes: athletes
                },
                trial: {
                    totalPages: Math.ceil(totalTrial / limit),
                    currentPage: page,
                    total: totalTrial,
                    trials: trials
                }
            }
        }

        return { result: result };
    }

    public getAllPerformance = async (query : {page: any, limit: any}) : Promise<{ errors?: ErrorInterface[]; result?: UserDto | any }> => {
        const page: number = parseInt(query.page!) || 1; // or get from query params
        const limit: number = parseInt(query.limit!) || 50;
        const skip = (page - 1) * limit;

        const performances = await Performance.find().skip(skip).limit(limit).sort({createdAt: -1})
        .populate({
            path: 'athlete',  // Path to populate
            model: 'UserAccount',  // Explicitly specifying the model is optional but sometimes necessary
            select: '-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt -accountType' 
        });
        
        const total = await Performance.countDocuments()
        
        return { result: {
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total,
            performances
        } };

    }


    public getSinglePerformance = async (query : {performance: any}) : Promise<{ errors?: ErrorInterface[]; result?: UserDto | any }> => {
        const performance = await Performance.findOne({_id: query.performance})
        .populate({
            path: 'athlete',  // Path to populate
            model: 'UserAccount',  // Explicitly specifying the model is optional but sometimes necessary
            select: '-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt -accountType' 
        });

        if (!performance) return { errors: [{message: "Activity not found"}] };
        
        return { result: performance};

    }
}

export default AthleteService;