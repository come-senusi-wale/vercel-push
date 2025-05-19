import AuthDto from "../../../../shared/types/dtos/athletes/athlete.dto";
import IAUthRespository from "../../../../shared/services/database/athletes/auth/type";
import ErrorInterface from "../../../../shared/types/interfaces/responses/error";
import { IAddAchievementRequest, IAddEducationRequest, IAddExperienceRequest, IEditAchievementRequest, IEditBioRequest, IEditEducationRequest, IEditExperienceRequest } from "../../../../shared/types/interfaces/requests/athletes/profile.request";
import cloudinary from "../../../../shared/services/cloudinary/bocket";
import {UserAccount} from "../../../../shared/services/database/athletes/auth/index";
import { UserAchievement, UserEducation, UserExperience } from "../../../../shared/types/interfaces/responses/athletes/athlete.response";

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

        return { result: profile.data?.getSecureRespons };
    }
  
    public editBio = async (data: {user: any, payload: IEditBioRequest}) : Promise<{ errors?: ErrorInterface[]; result?: AuthDto | any }> => {
     
        const {name, skill, position, city, country} = data.payload

        const editBio = await this._authModel.updateAccount(data.user,{name, skill, position, location: {city, country}})
        if (!editBio.status) return { errors: [{message: "Unable to update Bio"}] };

        return { result: editBio.data?.getSecureRespons };
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

        return { result: editProfileImag.data?.getSecureRespons };
    }


    public editAbout = async (data: {user: any, about: string}) : Promise<{ errors?: ErrorInterface[]; result?: AuthDto | any }> => {
        const editAbout = await this._authModel.updateAccount(data.user,{about: data.about})
        if (!editAbout.status) return { errors: [{message: "Unable to update about"}] };

        return { result: editAbout.data?.getSecureRespons };
    }

    public addAchievement = async (data: {user: any, achievement: IAddAchievementRequest}) : Promise<{ errors?: ErrorInterface[]; result?: AuthDto | any }> => {
        const newAchievement: UserAchievement = {...data.achievement};

       const addAchievement = await UserAccount.findByIdAndUpdate(
        data.user,
        { $push: { achievement: newAchievement } },
        { new: true }
      );

      if (!addAchievement) return { errors: [{message: "Unable to add achievement"}] };

        return { result: newAchievement };
    }

    public editAchievement = async (data: {user: any, achievement: IEditAchievementRequest}) : Promise<{ errors?: ErrorInterface[]; result?: AuthDto | any }> => {
        const {achievementId, title, sport, date, description} = data.achievement;

        const editAchievement = await UserAccount.findOneAndUpdate(
            { _id: data.user, "achievement._id": achievementId },
            {
            $set: {
                "achievement.$.title": title,
                "achievement.$.date": date,
                "achievement.$.sport": sport,
                "achievement.$.description": description,
            },
            },
            { new: true }
        );

        if (!editAchievement) return { errors: [{message: "Unable to Update achievement"}] };

        return { result: data.achievement };
    }

    public deleteAchievement = async (data: {user: any, achievementId: any}) : Promise<{ errors?: ErrorInterface[]; result?: AuthDto | any }> => {
        const deleteAchievement = await UserAccount.findByIdAndUpdate(
            data.user,
            { $pull: { achievement: { _id: data.achievementId } } },
            { new: true }
        );

        if (!deleteAchievement) return { errors: [{message: "Unable to delete achievement"}] };

        return { result: data.achievementId };
    }

    public addExperience = async (data: {user: any, experience: IAddExperienceRequest}) : Promise<{ errors?: ErrorInterface[]; result?: AuthDto | any }> => {
        const newExperience: UserExperience = {...data.experience};

        const addExperience = await UserAccount.findByIdAndUpdate(
            data.user,
            { $push: { experience: newExperience } },
            { new: true }
        );

        if (!addExperience) return { errors: [{message: "Unable to add experience"}] };

        return { result: newExperience };
    }

    public editExperience = async (data: {user: any, experience: IEditExperienceRequest}) : Promise<{ errors?: ErrorInterface[]; result?: AuthDto | any }> => {
        const {experienceId, title, sport, date, description} = data.experience;

        const editExperience = await UserAccount.findOneAndUpdate(
            { _id: data.user, "experience._id": experienceId },
            {
              $set: {
                "experience.$.title": title,
                "experience.$.date": date,
                "experience.$.sport": sport,
                "experience.$.description": description,
              },
            },
            { new: true }
        );

        if (!editExperience) return { errors: [{message: "Unable to Update experience"}] };

        return { result: data.experience };
    }

    public deleteExperience = async (data: {user: any, experienceId: any}) : Promise<{ errors?: ErrorInterface[]; result?: AuthDto | any }> => {
        const deleteExperience = await UserAccount.findByIdAndUpdate(
            data.user,
            { $pull: { experience: { _id: data.experienceId } } },
            { new: true }
          );

        if (!deleteExperience) return { errors: [{message: "Unable to delete experience"}] };

        return { result: data.experienceId };
    }

    public addEducation = async (data: {user: any, education: IAddEducationRequest}) : Promise<{ errors?: ErrorInterface[]; result?: AuthDto | any }> => {
        const newEducation: UserEducation = {...data.education};

        const addEducation = await UserAccount.findByIdAndUpdate(
            data.user,
            { $push: { education: newEducation } },
            { new: true }
        );

        if (!addEducation) return { errors: [{message: "Unable to add education"}] };

        return { result: newEducation };
    }

    public editEducation = async (data: {user: any, education: IEditEducationRequest}) : Promise<{ errors?: ErrorInterface[]; result?: AuthDto | any }> => {
        const {educationId, school, degree, field, startDate, endDate, description} = data.education;

        const editEducation = await UserAccount.findOneAndUpdate(
            { _id: data.user, "education._id": educationId },
            {
              $set: {
                "education.$.school": school,
                "education.$.degree": degree,
                "education.$.field": field,
                "education.$.startDate": startDate,
                "education.$.endDate": endDate,
                "education.$.description": description,
              },
            },
            { new: true }
        );

        if (!editEducation) return { errors: [{message: "Unable to Update education"}] };

        return { result: data.education };
    }

    public deleteEducation = async (data: {user: any, educationId: any}) : Promise<{ errors?: ErrorInterface[]; result?: AuthDto | any }> => {
        const deleteEducation = await UserAccount.findByIdAndUpdate(
            data.user,
            { $pull: { education: { _id: data.educationId } } },
            { new: true }
        );

        if (!deleteEducation) return { errors: [{message: "Unable to delete education"}] };

        return { result: data.educationId };
    }
  
    
  }
  
  export default ProfileService;