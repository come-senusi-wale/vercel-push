import ErrorInterface from "../../../../shared/types/interfaces/responses/error";
import { Trial } from "../../../../shared/services/database/general/trial/index";
import TrialDto from "../../../../shared/types/dtos/general/trial.dto";
import { startOfMonth, subMonths, endOfMonth, startOfYear, endOfYear, startOfDay,  endOfDay } from 'date-fns';
import { TrialStatus } from "../../../../shared/types/interfaces/responses/general/trial.response";
import { TrialApplication } from "../../../../shared/services/database/athletes/trialApplication";


class TrialService {
    
    constructor (
    ){
       
    }
  
    public getAllTrial = async (query: { page?: string, limit?: string}) : Promise<{ errors?: ErrorInterface[]; result?: TrialDto | any }> => {
        const page: number = parseInt(query.page!) || 1; // or get from query params
        const limit: number = parseInt(query.limit!) || 50;
        const skip = (page - 1) * limit;

        const trials = await Trial.find().skip(skip).limit(limit).sort({createdAt: -1})
        .populate({ 
            path: 'scout',  // Path to populate
            model: 'UserAccount',  // Explicitly specifying the model is optional but sometimes necessary
            select: '-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt -accountType' 
        })
      
        const total = await Trial.countDocuments()
          
        return { result: {
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total,
            trials
        } };

    }

    public getAllTrialByStatus = async (query: { page?: string, limit?: string, status: TrialStatus}) : Promise<{ errors?: ErrorInterface[]; result?: TrialDto | any }> => {
        const page: number = parseInt(query.page!) || 1; // or get from query params
        const limit: number = parseInt(query.limit!) || 50;
        const skip = (page - 1) * limit;
        console.log('query', query)

        const trials = await Trial.find({ status: query.status}).skip(skip).limit(limit).sort({createdAt: -1})
        .select('-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt')
      
        const total = await Trial.countDocuments({status: query.status})
          
        return { result: {
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total,
            trials
        } };

    }

    public getSingleTrial = async (query : {trial: any}) : Promise<{ errors?: ErrorInterface[]; result?: TrialDto | any }> => {
        const trial = await Trial.findOne({ _id: query.trial})
        .select('-password -emailVerified -emailOtp -emailOtpCreatedAt -passwordOtp -passwordOtpCreatedAt')
        if (!trial) return { errors: [{message: "Athlete not found"}] };

        return { result: {trial: trial}};

    }

    public search = async (query: { page?: string, limit?: string, name?: string, organizerName?: string, description?: string }) : Promise<{ errors?: ErrorInterface[]; result?: TrialDto | any }> => {
        const filter: any = {};

        const page: number = parseInt(query.page!) || 1; // or get from query params
        const limit: number = parseInt(query.limit!) || 50;
        const skip = (page - 1) * limit;

        // OR logic: build conditions dynamically
        const orConditions: any[] = [];
        // orConditions.push({ accountType: AccountType.Athlete });
        

        // Case-insensitive partial match for name
        if (query.name) {
            // filter.name = { $regex: query.name, $options: 'i' };
            orConditions.push({ name: { $regex: query.name, $options: 'i' } });
        }

        if (query.organizerName) {
            // filter.trialType = query.type;
            orConditions.push({ organizerName: { $regex: query.organizerName, $options: 'i' } });
        }


        if (query.description) {
            // filter.location = query.location;
            orConditions.push({ description: { $regex: query.description, $options: 'i' } });
        }


        if (orConditions.length > 1) {
            filter.$or = orConditions;
        }

        let result: any = await Trial.find(filter).skip(skip).limit(limit).sort({createdAt: -1});
        let total = await Trial.countDocuments(filter)


        return { result: {
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total,
            result
        } };
    }


    public totalTrial = async () : Promise<{ errors?: ErrorInterface[]; result?: TrialDto | any }> => {
        const totalTrial = await Trial.countDocuments()
          
        return { result: {
            totalTrial: totalTrial
        } };

    }


    public totalLiveTrial = async () : Promise<{ errors?: ErrorInterface[]; result?: TrialDto | any }> => {
        const totalTrial = await Trial.countDocuments({status: TrialStatus.Open})
          
        return { result: {
            totalTrial: totalTrial
        } };

    }

    public totalTrialCreatedForThisMonth = async () : Promise<{ errors?: ErrorInterface[]; result?: TrialDto | any }> => {
        const start = startOfMonth(new Date());
        const end = endOfMonth(new Date());
      
        const total = await Trial.countDocuments({
          createdAt: { $gte: start, $lte: end }
        });
          
        return { result: {
            totalTrial: total
        } };

    }

    public lastMonthPercentCrate = async () : Promise<{ errors?: ErrorInterface[]; result?: TrialDto | any }> => {
        const now = new Date();

        const lastMonthStart = startOfMonth(subMonths(now, 1));
        const lastMonthEnd = endOfMonth(subMonths(now, 1));
      
        const prevMonthStart = startOfMonth(subMonths(now, 2));
        const prevMonthEnd = endOfMonth(subMonths(now, 2));

        const lastMonthCount = await Trial.countDocuments({
          createdAt: {
            $gte: lastMonthStart,
            $lte: lastMonthEnd
          }
        });
      
        const prevMonthCount = await Trial.countDocuments({
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

    public totalTrialCreatePerMonth = async () : Promise<{ errors?: ErrorInterface[]; result?: TrialDto | any }> => {
        const now = new Date();
        const yearStart = startOfYear(now);
        const yearEnd = endOfYear(now);

        const monthlyRegistrations = await Trial.aggregate([
            {
            $match: {
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

    public totalApplicationToday = async () : Promise<{ errors?: ErrorInterface[]; result?: TrialDto | any }> => {
        const todayStart = startOfDay(new Date());
        const todayEnd = endOfDay(new Date());
      
        const total = await TrialApplication.countDocuments({
          createdAt: {
            $gte: todayStart,
            $lte: todayEnd,
          },
        });
          
        return { result: {
            totalApplication: total
        } };

    }

    public totalApplication = async () : Promise<{ errors?: ErrorInterface[]; result?: TrialDto | any }> => {
        const total = await TrialApplication.countDocuments();
          
        return { result: {
            totalApplication: total
        } };

    }

    public lastMonthPercentApplied = async () : Promise<{ errors?: ErrorInterface[]; result?: TrialDto | any }> => {
        const now = new Date();

        const lastMonthStart = startOfMonth(subMonths(now, 1));
        const lastMonthEnd = endOfMonth(subMonths(now, 1));
      
        const prevMonthStart = startOfMonth(subMonths(now, 2));
        const prevMonthEnd = endOfMonth(subMonths(now, 2));

        const lastMonthCount = await TrialApplication.countDocuments({
          createdAt: {
            $gte: lastMonthStart,
            $lte: lastMonthEnd
          }
        });
      
        const prevMonthCount = await TrialApplication.countDocuments({
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

}

export default TrialService;