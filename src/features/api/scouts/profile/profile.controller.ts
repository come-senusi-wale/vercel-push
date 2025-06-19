import { Request, Response } from "express";
import ProfileService from "./profile.service";
import { IScoutEditBioRequest } from "../../../../shared/types/interfaces/requests/scouts/profile.request";


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
        const body: IScoutEditBioRequest = req.body;
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

    public addSport = async (req: Request, res: Response)  => {
        const {newSports} = req.body;
        const userId = req.user?._id
    
        const { result, errors } = await this._ProfileService.addSport({user: userId, newSports});

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


    public deleteSport = async (req: Request, res: Response)  => {
        const {sportsToRemove} = req.body;
        const userId = req.user?._id
    
        const { result, errors } = await this._ProfileService.deleteSport({user: userId, sportsToRemove});

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

    public addLookFor = async (req: Request, res: Response)  => {
        const {newLookFor} = req.body;
        const userId = req.user?._id
    
        const { result, errors } = await this._ProfileService.addLookFor({user: userId, newLookFor});

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


    public deleteLookFor = async (req: Request, res: Response)  => {
        const {lookForToRemove} = req.body;
        const userId = req.user?._id
    
        const { result, errors } = await this._ProfileService.deleteLookFor({user: userId, lookForToRemove});

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