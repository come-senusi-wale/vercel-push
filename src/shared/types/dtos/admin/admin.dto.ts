import { Types } from "mongoose";
import { IAdminAccount } from "../../interfaces/responses/admin/admin.response";


class AdminAccountDto implements IAdminAccount {
    public id?: string;
    public email: string;
    public password: string ;
    public updatedAt?: Date;
    public createdAt?: Date;
    
    constructor(adminAccount: IAdminAccount) {
      this.id = adminAccount._id;
      this.email = adminAccount.email;
      this.password = adminAccount.password;
      this.updatedAt = adminAccount.updatedAt;
      this.createdAt = adminAccount.createdAt;

    }
  
    get getModel() {
      return {
        _id: this.id,
        email: this.email,
        password: this.password,
        updatedAt: this.updatedAt ? new Date(this.updatedAt): undefined,
        createdAt: this.createdAt ? new Date(this.createdAt): undefined,
      } as IAdminAccount
    }

    get getSecureRespons() {
        return {
          _id: this.id,
          email: this.email,
          updatedAt: this.updatedAt ? new Date(this.updatedAt): undefined,
          createdAt: this.createdAt ? new Date(this.createdAt): undefined,
        } as IAdminAccount
      }
  
}

export default AdminAccountDto;