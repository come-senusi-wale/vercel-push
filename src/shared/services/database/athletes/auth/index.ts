import { Schema, model, PaginateModel } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
import { IAthletesAccount } from "../../../../types/interfaces/responses/athletes/athlete.response";
import IUserAccountModel from "./type";
import UserAccountDto from "../../../../types/dtos/athletes/athlete.dto";


const UserAccountSchema = new Schema<IAthletesAccount>({
    email: {
      type: String,
      unique: true,
      required: true
    },
    password: {
        type: String,
    },
    name: {
        type: String,
    },
    updatedAt: {
      type: String
    },
    createdAt: {
      type: String
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

  updatePurchase = async (id: string, details: Partial<IAthletesAccount>) => {
    try {
        const data = await this.UserAccount.findByIdAndUpdate(id, {$push: details});
        if (data) {
          return {status: true, data: new UserAccountDto(data)};
        } else {
          return {status: false, error: "Unable to update user Purchase"};
        }
    } catch (error) {
        return {status: false, error };
    }
  }

}

export default UserAccountModel;