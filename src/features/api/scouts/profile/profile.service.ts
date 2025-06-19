import AuthDto from "../../../../shared/types/dtos/athletes/athlete.dto";
import IAUthRespository from "../../../../shared/services/database/athletes/auth/type";
import ErrorInterface from "../../../../shared/types/interfaces/responses/error";
import { IAddAchievementRequest, IAddEducationRequest, IAddExperienceRequest, IAddStatisticRequest, IEditAchievementRequest, IEditBioRequest, IEditEducationRequest, IEditExperienceRequest } from "../../../../shared/types/interfaces/requests/athletes/profile.request";
import cloudinary from "../../../../shared/services/cloudinary/bocket";
import {UserAccount} from "../../../../shared/services/database/athletes/auth/index";
import { UserAchievement, UserEducation, UserExperience, UserStatistic } from "../../../../shared/types/interfaces/responses/athletes/athlete.response";
import { IScoutEditBioRequest } from "../../../../shared/types/interfaces/requests/scouts/profile.request";
import UserAccountDto from "../../../../shared/types/dtos/athletes/athlete.dto";

class ProfileService {
    private _authModel: IAUthRespository;
    
    constructor (
      { authModel } : {
        authModel: IAUthRespository;
      }){
        this._authModel = authModel;
    }


    public getProfile = async (user: any) : Promise<{ errors?: ErrorInterface[]; result?: AuthDto | any }> => {
        const profile = await this._authModel.checkIfExist({_id: user})

        if (!profile.status) return { errors: [{message: "User not found"}] };

        return { result: profile.data?.getSecureResponse };
    }
  
    public editBio = async (data: {user: any, payload: IScoutEditBioRequest}) : Promise<{ errors?: ErrorInterface[]; result?: AuthDto | any }> => {
     
        const {name, title, position, city, country} = data.payload

        const editBio = await this._authModel.updateAccount(data.user,{name, title, position, location: {city, country}})
        if (!editBio.status) return { errors: [{message: "Unable to update Bio"}] };

        return { result: editBio.data?.getSecureResponse };
    }

    public editProfileImg = async (data: {user: any, file: any}) : Promise<{ errors?: ErrorInterface[]; result?: AuthDto | any }> => {
     
        if (!data.file && !data.file?.buffer) return { errors: [{message: "Profile image is required"}] };

        const uploadResult = await new Promise<{ url: string }>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
            { folder: "my_app_images" },
            (error, result) => {
                if (error || !result) return { errors: [{message: "unable to upload image"}] };
                resolve({ url: result.secure_url });
            }
            );
    
            stream.write(data.file.buffer);
            stream.end();
        });
    
        const profileImg = uploadResult.url;

        const editProfileImag = await this._authModel.updateAccount(data.user,{profileImg})
        if (!editProfileImag.status) return { errors: [{message: "Unable to update profile image"}] };

        return { result: editProfileImag.data?.getSecureResponse };
    }


    public editAbout = async (data: {user: any, about: string}) : Promise<{ errors?: ErrorInterface[]; result?: AuthDto | any }> => {
        const editAbout = await this._authModel.updateAccount(data.user,{about: data.about})
        if (!editAbout.status) return { errors: [{message: "Unable to update about"}] };

        return { result: editAbout.data?.getSecureResponse };
    }

    public addSport = async (data: {user: any, newSports: string[]}) : Promise<{ errors?: ErrorInterface[]; result?: AuthDto | any }> => {
        const user = await UserAccount.findById(data.user);
        if (!user) return { errors: [{message: "User not found"}] };
    
        const updatedSports = Array.from(new Set([...user.sports!, ...data.newSports])); // remove duplicates

       const updateSport =  await this._authModel.updateAccount(data.user,{sports: updatedSports})
       if (!updateSport.status) return { errors: [{message: "Unable to update Sport"}] };
    
        return { result: updateSport.data?.getSecureResponse };
    }

    public deleteSport = async (data: {user: any, sportsToRemove: string[]}) : Promise<{ errors?: ErrorInterface[]; result?: AuthDto | any }> => {
        const user = await UserAccount.findById(data.user);
        if (!user) return { errors: [{message: "User not found"}] };
      
        const remainingSport = user.sports!.filter(sport => !data.sportsToRemove.includes(sport));
        
        const updateSport =  await this._authModel.updateAccount(data.user,{sports: remainingSport})
        if (!updateSport.status) return { errors: [{message: "Unable to update Sport"}] };
     
        return { result: updateSport.data?.getSecureResponse };
    }

    public addLookFor = async (data: {user: any, newLookFor: string[]}) : Promise<{ errors?: ErrorInterface[]; result?: AuthDto | any }> => {
        const user = await UserAccount.findById(data.user);
        if (!user) return { errors: [{message: "User not found"}] };
      
        const updatedLookFor = Array.from(new Set([...user.lookFor!, ...data.newLookFor])); // remove duplicates
      
        const updateLookFor =  await this._authModel.updateAccount(data.user,{lookFor: updatedLookFor})
        if (!updateLookFor.status) return { errors: [{message: "Unable to update data"}] };
     
         return { result: updateLookFor.data?.getSecureResponse };
    }

    public deleteLookFor = async (data: {user: any, lookForToRemove: string[]}) : Promise<{ errors?: ErrorInterface[]; result?: AuthDto | any }> => {
        const user = await UserAccount.findById(data.user);
        if (!user) return { errors: [{message: "User not found"}] };
      
        const remainingLookFor = user.lookFor!.filter(sport => !data.lookForToRemove.includes(sport));
        
        const updateLookFor =  await this._authModel.updateAccount(data.user,{lookFor: remainingLookFor})
        if (!updateLookFor.status) return { errors: [{message: "Unable to update data"}] };
     
        return { result: updateLookFor.data?.getSecureResponse };
    }
    
  }
  
  export default ProfileService;