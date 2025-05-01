import { Schema, model, PaginateModel } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
import { IAthletesAccount, AccountType } from "../../../../types/interfaces/responses/athletes/athlete.response";
import IUserAccountModel from "./type";
import UserAccountDto from "../../../../types/dtos/athletes/athlete.dto";


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