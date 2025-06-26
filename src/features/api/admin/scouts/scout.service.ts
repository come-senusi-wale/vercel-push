import ErrorInterface from "../../../../shared/types/interfaces/responses/error";
import IUserModel from "../../../../shared/services/database/athletes/auth/type";
import { UserAccount } from "../../../../shared/services/database/athletes/auth/index";
import UserDto from "../../../../shared/types/dtos/athletes/athlete.dto";
import { AccountStatus, AccountType } from "../../../../shared/types/interfaces/responses/athletes/athlete.response";
import { startOfMonth, subMonths, endOfMonth, startOfYear, endOfYear } from 'date-fns';


class ScoutService {
    private _userModel: IUserModel;
    
    constructor (
      { userModel } : {
        userModel: IUserModel;
      }){
        this._userModel = userModel;
    }
  
    public getAllScout = async (query: { page?: string, limit?: string}) : Promise<{ errors?: ErrorInterface[]; result?: UserDto | any }> => {
        const page: number = parseInt(query.page!) || 1; // or get from query params
        const limit: number = parseInt(query.limit!) || 50;
        const skip = (page - 1) * limit;

        const scouts = await UserAccount.find({accountType: AccountType.Scout}).skip(skip).limit(limit).sort({createdAt: -1})
        .select('-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt')
      
        const total = await UserAccount.countDocuments({accountType: AccountType.Scout})
          
        return { result: {
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total,
            scouts
        } };

    }

    public getAllScoutByStatus = async (query: { page?: string, limit?: string, status: AccountStatus}) : Promise<{ errors?: ErrorInterface[]; result?: UserDto | any }> => {
        const page: number = parseInt(query.page!) || 1; // or get from query params
        const limit: number = parseInt(query.limit!) || 50;
        const skip = (page - 1) * limit;

        const scouts = await UserAccount.find({accountType: AccountType.Scout, accountStatus: query.status}).skip(skip).limit(limit).sort({createdAt: -1})
        .select('-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt')
      
        const total = await UserAccount.countDocuments({accountType: AccountType.Scout, accountStatus: query.status})
          
        return { result: {
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total,
            scouts
        } };

    }

    public getSingleScout = async (query : {scout: any}) : Promise<{ errors?: ErrorInterface[]; result?: UserDto | any }> => {
        const scout = await this._userModel.checkIfExist({_id: query.scout, accountType: AccountType.Scout})
        
        if (!scout.status) return { errors: [{message: "Scout not found"}] };

        return { result: {scout: scout.data?.getSecureResponse}};

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

    public totalScouts = async () : Promise<{ errors?: ErrorInterface[]; result?: UserDto | any }> => {
        const totalScouts = await UserAccount.countDocuments({accountType: AccountType.Scout})
          
        return { result: {
            totalScouts: totalScouts 
        } };
    }

    public lastMonthPercentReg = async () : Promise<{ errors?: ErrorInterface[]; result?: UserDto | any }> => {
        const now = new Date();

        const lastMonthStart = startOfMonth(subMonths(now, 1));
        const lastMonthEnd = endOfMonth(subMonths(now, 1));
      
        const prevMonthStart = startOfMonth(subMonths(now, 2));
        const prevMonthEnd = endOfMonth(subMonths(now, 2));

        console.log("lastMonthStart", lastMonthStart)
        console.log("lastMonthEnd", lastMonthEnd)
        console.log("prevMonthStart", prevMonthStart)
        console.log("prevMonthEnd", prevMonthEnd)
      
        const lastMonthCount = await UserAccount.countDocuments({
          accountType: AccountType.Scout,
          createdAt: {
            $gte: lastMonthStart,
            $lte: lastMonthEnd
          }
        });
      
        const prevMonthCount = await UserAccount.countDocuments({
          accountType: AccountType.Scout,
          createdAt: {
            $gte: prevMonthStart,
            $lte: prevMonthEnd
          }
        });
      
        let percentageChange = 0;
      
        if (prevMonthCount === 0 && lastMonthCount > 0) {
          percentageChange = 100; // New growth
        } else if (prevMonthCount === 0 && lastMonthCount === 0) {
          percentageChange = 0; // No change, no data
        } else {
          percentageChange = ((lastMonthCount - prevMonthCount) / prevMonthCount) * 100;
        }
      
        return { result: {
            lastMonthCount,
            prevMonthCount,
            percentageChange: Math.round(percentageChange * 100) / 100, // round to 2 decimal places
            trend: percentageChange > 0 ? 'increase' : percentageChange < 0 ? 'decrease' : 'no change'
        }};
    }

    public totalRegPerMonth = async () : Promise<{ errors?: ErrorInterface[]; result?: UserDto | any }> => {
        const now = new Date();
        const yearStart = startOfYear(now);
        const yearEnd = endOfYear(now);

        const monthlyRegistrations = await UserAccount.aggregate([
            {
            $match: {
                accountType: AccountType.Scout,
                createdAt: {
                $gte: yearStart,
                $lte: yearEnd
                }
            }
            },
            {
            $group: {
                _id: { month: { $month: '$createdAt' } },
                count: { $sum: 1 }
            }
            },
            {
            $sort: { '_id.month': 1 }
            }
        ]);

        // Fill in months with 0 if no users were registered
        const result: Record<string, number> = {};
        for (let i = 1; i <= 12; i++) {
            const monthData = monthlyRegistrations.find(item => item._id.month === i);
            result[`Month ${i}`] = monthData ? monthData.count : 0;
        }

        return {
            result
        };
    }
}

export default ScoutService;