import { Schema, model, PaginateModel } from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'
import IAdminAccountModel from "./type";
import AdminAccountDto from "../../../../types/dtos/admin/admin.dto";
import { AdminRole, AdminStatus, IAdminAccount } from "../../../../types/interfaces/responses/admin/admin.response";

const AdminAccountSchema = new Schema<IAdminAccount>({
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
    role: {
      type: String,  
      enum: Object.values(AdminRole),  
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
    status: {
      type: String,  
      enum: Object.values(AdminStatus), 
      default: AdminStatus.Active 
    },
    updatedAt: {
      type: String
    },
    createdAt: {
      type: String
    },
  });
  
  AdminAccountSchema.plugin(mongoosePaginate);
  
  export const AdminAccount = model<IAdminAccount, PaginateModel<IAdminAccount>>("AdminAccount", AdminAccountSchema)


  class  AdminAccountModel implements  IAdminAccountModel {
    adminAccount: typeof AdminAccount;
    
    constructor() {
        this.adminAccount =  AdminAccount;
    }

    createAccountDB = async (details: Partial<IAdminAccount>) => {
        try {
            const data = await this.adminAccount.create(details);
            if (data) {
              return {status: true, data: new AdminAccountDto(data)};
            } else {
              return {status: false, error: "Couldn't create account"};
            }
        } catch (error) {
            return {status: false, error };
        }
    }

    checkIfExist = async (details: Partial<IAdminAccount>) => {
        try {
            const data = await this.adminAccount.findOne(details);
            if (data) {
              return {status: true, data: new AdminAccountDto(data)};
            } else {
              return {status: false, error: "no account find"};
            }
        } catch (error) {
            return {status: false, error };
        }
    }

    updateAccount = async (id: string, details: Partial<IAdminAccount>) => {
      try {
          const data = await this.adminAccount.findOneAndUpdate({_id: id}, details, {new: true});
          if (data) {
            return {status: true, data: new AdminAccountDto(data)};
          } else {
            return {status: false, error: "Unable to update Account"};
          }
      } catch (error) {
          return {status: false, error };
      }
  }

}

export default AdminAccountModel;