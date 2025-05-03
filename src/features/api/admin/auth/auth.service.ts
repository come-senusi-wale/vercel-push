import AdminDto from "../../../../shared/types/dtos/admin/admin.dto";
import AuthorizationInterface, { TokenType } from "../../../../shared/services/encryption/index";
import IAdminModelRepository from "../../../../shared/services/database/admin/auth/type";
import ErrorInterface from "../../../../shared/types/interfaces/responses/error";

const ERROR_TO_SAVE_ADMIN: ErrorInterface = {
    message: 'unable to create admin',
};


class AuthService {
    private _adminModel: IAdminModelRepository;
    private _auth: AuthorizationInterface
    
    constructor (
      { adminModel, auth } : {
        adminModel: IAdminModelRepository;
        auth: AuthorizationInterface;
      }){
        this._adminModel = adminModel;
        this._auth = auth;
    }
  
    public registerAdmin = async (email: string, password: string) : Promise<{ errors?: ErrorInterface[]; admin?: AdminDto | any }> => {
        // const hashPassword = this._auth.encryptPassword(password)
        // const response = await this._adminModel.saveUserToDB({emailAddress: email, password: hashPassword});
        // if (!response.data) return { errors: [ERROR_TO_SAVE_ADMIN] };

        // const accessToken = this._auth.encryptToken(response.data.getUserForToken, TokenType.accessToken);
        // response.data.accessToken = accessToken;
    
        // return { admin: response.data };
        return { admin: "" };
    }
  
    
  }
  
  export default AuthService;