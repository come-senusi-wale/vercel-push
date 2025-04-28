import { Types } from "mongoose";
import { IAthletesAccount } from "../../interfaces/responses/athletes/athlete.response";


class UserAccountDto implements IAthletesAccount {
    public id?: string;
    public email: string;
    public password: string ;
    public name: string;
    public purchaseHistory: Types.ObjectId[];
    public updatedAt?: Date;
    public createdAt?: Date;
    
    constructor(userAccount: IAthletesAccount) {
      this.id = userAccount._id;
      this.email = userAccount.email;
      this.password = userAccount.password;
      this.name = userAccount.name;
      this.purchaseHistory = userAccount.purchaseHistory
      this.updatedAt = userAccount.updatedAt;
      this.createdAt = userAccount.createdAt;

    }
  
    get getModel() {
      return {
        _id: this.id,
        email: this.email,
        password: this.password,
        name: this.name,
        purchaseHistory: this.purchaseHistory,
        updatedAt: this.updatedAt ? new Date(this.updatedAt): undefined,
        createdAt: this.createdAt ? new Date(this.createdAt): undefined,
      } as IAthletesAccount
    }

    get getSecureRespons() {
        return {
          _id: this.id,
          email: this.email,
          name: this.name,
          purchaseHistory: this.purchaseHistory,
          updatedAt: this.updatedAt ? new Date(this.updatedAt): undefined,
          createdAt: this.createdAt ? new Date(this.createdAt): undefined,
        } as IAthletesAccount
      }
  
}

export default UserAccountDto;