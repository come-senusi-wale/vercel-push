import { Request, Response } from "express";
import ProfileService from "./profile.service";
import { IAddAchievementRequest, IAddEducationRequest, IAddExperienceRequest, IEditAchievementRequest, IEditBioRequest, IEditEducationRequest, IEditExperienceRequest } from "../../../../shared/types/interfaces/requests/athletes/profile.request";


class ProfileController {
    private _ProfileService: ProfileService;
    
    constructor({ profileService } : {profileService: ProfileService, }) {
        this._ProfileService = profileService;
    }

    public getProfile = async (req: Request, res: Response)  => {
        const userId = req.user?._id
    
        const { result, errors } = await this._ProfileService.getProfile(userId);
  
        if (errors && errors.length > 0) return res.status(401).json({
            error: errors,
            code: 401,
            status: false
        });
  
        if (result === null) return res.status(401).json({
            code: 401,
            status: false
        });

        return res.status(201).json({
            data: result,
            code: 201,
            status: true
        });
    }

    public editBio = async (req: Request, res: Response)  => {
        const body: IEditBioRequest = req.body;
        const userId = req.user?._id
    
        const { result, errors } = await this._ProfileService.editBio({user: userId, payload: body});

        if (errors && errors.length > 0) return res.status(401).json({
            error: errors,
            code: 401,
            status: false
        });
    
        if (result === null) return res.status(401).json({
            code: 401,
            status: false
        });
    
        return res.status(201).json({
            data: result,
            code: 201,
            status: true
        });
    }

    public editProfileImg = async (req: Request, res: Response)  => {
        const file = req.file;
        const userId = req.user?._id
    
        const { result, errors } = await this._ProfileService.editProfileImg({user: userId, file: file});

        if (errors && errors.length > 0) return res.status(401).json({
            error: errors,
            code: 401,
            status: false
        });
    
        if (result === null) return res.status(401).json({
            code: 401,
            status: false
        });
    
        return res.status(201).json({
            data: result,
            code: 201,
            status: true
        });
    }


    public editAbout = async (req: Request, res: Response)  => {
        const {about} = req.body;
        const userId = req.user?._id
    
        const { result, errors } = await this._ProfileService.editAbout({user: userId, about: about});

        if (errors && errors.length > 0) return res.status(401).json({
            error: errors,
            code: 401,
            status: false
        });
    
        if (result === null) return res.status(401).json({
            code: 401,
            status: false
        });
    
        return res.status(201).json({
            data: result,
            code: 201,
            status: true
        });
    }

    public addAchievement = async (req: Request, res: Response)  => {
        const body: IAddAchievementRequest = req.body;
        const userId = req.user?._id
    
        const { result, errors } = await this._ProfileService.addAchievement({user: userId, achievement: body});

        if (errors && errors.length > 0) return res.status(401).json({
            error: errors,
            code: 401,
            status: false
        });
    
        if (result === null) return res.status(401).json({
            code: 401,
            status: false
        });
    
        return res.status(201).json({
            data: result,
            code: 201,
            status: true
        });
    }


    public editAchievement = async (req: Request, res: Response)  => {
        const body: IEditAchievementRequest = req.body;
        const userId = req.user?._id
    
        const { result, errors } = await this._ProfileService.editAchievement({user: userId, achievement: body});

        if (errors && errors.length > 0) return res.status(401).json({
            error: errors,
            code: 401,
            status: false
        });
    
        if (result === null) return res.status(401).json({
            code: 401,
            status: false
        });
    
        return res.status(201).json({
            data: result,
            code: 201,
            status: true
        });
    }


    public deleteAchievement = async (req: Request, res: Response)  => {
        const {achievementId} = req.body;
        const userId = req.user?._id
    
        const { result, errors } = await this._ProfileService.deleteAchievement({user: userId, achievementId});

        if (errors && errors.length > 0) return res.status(401).json({
            error: errors,
            code: 401,
            status: false
        });
    
        if (result === null) return res.status(401).json({
            code: 401,
            status: false
        });
    
        return res.status(201).json({
            data: result,
            code: 201,
            status: true
        });
    }

    public addExperience = async (req: Request, res: Response)  => {
        const body: IAddExperienceRequest = req.body;
        const userId = req.user?._id
    
        const { result, errors } = await this._ProfileService.addExperience({user: userId, experience: body});

        if (errors && errors.length > 0) return res.status(401).json({
            error: errors,
            code: 401,
            status: false
        });
    
        if (result === null) return res.status(401).json({
            code: 401,
            status: false
        });
    
        return res.status(201).json({
            data: result,
            code: 201,
            status: true
        });
    }

    public editExperience = async (req: Request, res: Response)  => {
        const body: IEditExperienceRequest = req.body;
        const userId = req.user?._id
    
        const { result, errors } = await this._ProfileService.editExperience({user: userId, experience: body});

        if (errors && errors.length > 0) return res.status(401).json({
            error: errors,
            code: 401,
            status: false
        });
    
        if (result === null) return res.status(401).json({
            code: 401,
            status: false
        });
    
        return res.status(201).json({
            data: result,
            code: 201,
            status: true
        });
    }

    public deleteExperience = async (req: Request, res: Response)  => {
        const {experienceId} = req.body;
        const userId = req.user?._id
    
        const { result, errors } = await this._ProfileService.deleteExperience({user: userId, experienceId});

        if (errors && errors.length > 0) return res.status(401).json({
            error: errors,
            code: 401,
            status: false
        });
    
        if (result === null) return res.status(401).json({
            code: 401,
            status: false
        });
    
        return res.status(201).json({
            data: result,
            code: 201,
            status: true
        });
    }

    public addEducation = async (req: Request, res: Response)  => {
        const body: IAddEducationRequest = req.body;
        const userId = req.user?._id
    
        const { result, errors } = await this._ProfileService.addEducation({user: userId, education: body});

        if (errors && errors.length > 0) return res.status(401).json({
            error: errors,
            code: 401,
            status: false
        });
    
        if (result === null) return res.status(401).json({
            code: 401,
            status: false
        });
    
        return res.status(201).json({
            data: result,
            code: 201,
            status: true
        });
    }


    public editEducation = async (req: Request, res: Response)  => {
        const body: IEditEducationRequest = req.body;
        const userId = req.user?._id
    
        const { result, errors } = await this._ProfileService.editEducation({user: userId, education: body});

        if (errors && errors.length > 0) return res.status(401).json({
            error: errors,
            code: 401,
            status: false
        });
    
        if (result === null) return res.status(401).json({
            code: 401,
            status: false
        });
    
        return res.status(201).json({
            data: result,
            code: 201,
            status: true
        });
    }

    public deleteEducation = async (req: Request, res: Response)  => {
        const {educationId} = req.body;
        const userId = req.user?._id
    
        const { result, errors } = await this._ProfileService.deleteEducation({user: userId, educationId});

        if (errors && errors.length > 0) return res.status(401).json({
            error: errors,
            code: 401,
            status: false
        });
    
        if (result === null) return res.status(401).json({
            code: 401,
            status: false
        });
    
        return res.status(201).json({
            data: result,
            code: 201,
            status: true
        });
    }

   

    
}


export default ProfileController;