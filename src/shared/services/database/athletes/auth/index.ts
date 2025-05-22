import { Schema, model, PaginateModel } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
import { IAthletesAccount, AccountType, UserAchievement, UserEducation, UserExperience, UserLocation, UserStatistic } from "../../../../types/interfaces/responses/athletes/athlete.response";
import IUserAccountModel from "./type";
import UserAccountDto from "../../../../types/dtos/athletes/athlete.dto";

const LocationSchema = new Schema<UserLocation>({
  country: { type: String, default: '' },
  city: { type: String, default: '' },
});

const AchievementSchema = new Schema<UserAchievement>({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  sport: { type: String, required: true },
  description: { type: String, required: true },
});

const ExperienceSchema = new Schema<UserExperience>({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  sport: { type: String, required: true },
  description: { type: String, required: true },
});

const EducationSchema = new Schema<UserEducation>({
  school: { type: String, required: true },
  degree: { type: String, required: true },
  field: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Schema.Types.Mixed, required: true }, // Date or string
  description: { type: String },
});

const StatisticSchema = new Schema<UserStatistic>({
  height: { type: String, required: true },
  weight: { type: String, required: true },
  bodyFat: { type: String, required: true },
  BMI: { type: String, required: true },
  maxHeight: { type: String, required: true },
  v02Max: { type: String, required: true },
  sprintSpeed: { type: String, required: true },
  verticalJump: { type: String, required: true },
  agility: { type: String, required: true },
});



const UserAccountSchema = new Schema<IAthletesAccount>({
    email: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
    },
    password: {
        type: String,
    },
    accountType: {
      type: String,  
      enum: Object.values(AccountType),  
      required: true, 
      
    },
    emailVerified: {
      type: Boolean,
      default: false
    },
    emailOtp: {
      type: String
    },
    emailOtpCreatedAt: {
      type: Date
    },
    passwordOtp: {
      type: String
    },
    passwordOtpCreatedAt: {
      type: Date
    },
    passwordOtpVerified: {
      type: Boolean,
      default: false
    },
    requestForPasswordChange: {
      type: Boolean,
      default: false
    },
    pushNotification: {
      type: Boolean,
      default: true
    },
    emailNotification: {
      type: Boolean,
      default: true
    },
    soundVibration: {
      type: Boolean,
      default: true
    },
    
    skill: { type: String, default: '' },
    position: { type: String, default: '' },
    location: { type: LocationSchema, default: () => ({}) },
    profileImg: { type: String, default: '' },
    about: { type: String, default: '' },
    statistic: { type: StatisticSchema, default: () => ({}) },
    achievement: { type: [AchievementSchema], default: [] },
    experience: { type: [ExperienceSchema], default: [] },
    education: { type: [EducationSchema], default: [] },

    updatedAt: {
      type: Date,
      default: Date.now,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  UserAccountSchema.plugin(mongoosePaginate);
  
  export const UserAccount = model<IAthletesAccount, PaginateModel<IAthletesAccount>>("UserAccount", UserAccountSchema)

  class  UserAccountModel implements  IUserAccountModel {
    UserAccount: typeof UserAccount;
    
    constructor() {
        this.UserAccount =  UserAccount;
    }

    createAccountToDB = async (details: Partial<IAthletesAccount>) => {
        try {
            const data = await this.UserAccount.create(details);
            if (data) {
              return {status: true, data: new UserAccountDto(data)};
            } else {
              return {status: false, error: "Couldn't create account"};
            }
        } catch (error) {
            return {status: false, error };
        }
    }

    checkIfExist = async (details: Partial<IAthletesAccount>) => {
        try {
            const data = await this.UserAccount.findOne(details);
            if (data) {
              return {status: true, data: new UserAccountDto(data)};
            } else {
              return {status: false, error: "no account find"};
            }
        } catch (error) {
            return {status: false, error };
        }
    }

    updateAccount = async (id: string, details: Partial<IAthletesAccount>) => {
      try {
          const data = await this.UserAccount.findOneAndUpdate({_id: id}, details, {new: true});
          if (data) {
            return {status: true, data: new UserAccountDto(data)};
          } else {
            return {status: false, error: "Unable to update configuration"};
          }
      } catch (error) {
          return {status: false, error };
      }
    }


}

export default UserAccountModel;