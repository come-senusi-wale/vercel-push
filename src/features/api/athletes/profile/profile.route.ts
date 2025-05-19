import express from "express";
const router = express.Router();
import ProfileController from "./profile.controller";
import ProfileService from "./profile.service";
import { AthleteProfileValidation } from "./profile.validation";
import { isAthleteAuthenticated } from "../../../../shared/services/middleware/user.middleware";
import AuthModel from "../../../../shared/services/database/athletes/auth/index";
import { singleFileUpload } from "../../../../shared/services/middleware/fileUpload.middleware";



const authModel = new AuthModel()
const profileService = new ProfileService({ authModel })
const profileController = new ProfileController({profileService})

router.get("/profile", isAthleteAuthenticated, profileController.getProfile);
router.post("/profile-bio", isAthleteAuthenticated, AthleteProfileValidation.bio, AthleteProfileValidation.validateFormData, profileController.editBio);
router.post("/profile-img", isAthleteAuthenticated, singleFileUpload('picture', ['image']), profileController.editProfileImg);
router.post("/profile-about", isAthleteAuthenticated, AthleteProfileValidation.about, AthleteProfileValidation.validateFormData, profileController.editAbout);

router.post("/profile/add-achievement", isAthleteAuthenticated, AthleteProfileValidation.addAchievement, AthleteProfileValidation.validateFormData, profileController.addAchievement);
router.post("/profile/edit-achievement", isAthleteAuthenticated, AthleteProfileValidation.editAchievement, AthleteProfileValidation.validateFormData, profileController.editAchievement);
router.post("/profile/remove-achievement", isAthleteAuthenticated, AthleteProfileValidation.removeAchievement, AthleteProfileValidation.validateFormData, profileController.deleteAchievement);

router.post("/profile/add-experience", isAthleteAuthenticated, AthleteProfileValidation.addExperience, AthleteProfileValidation.validateFormData, profileController.addExperience);
router.post("/profile/edit-experience", isAthleteAuthenticated, AthleteProfileValidation.editExperience, AthleteProfileValidation.validateFormData, profileController.editExperience);
router.post("/profile/remove-experience", isAthleteAuthenticated, AthleteProfileValidation.removeExperience, AthleteProfileValidation.validateFormData, profileController.deleteExperience);

router.post("/profile/add-education", isAthleteAuthenticated, AthleteProfileValidation.addEducation, AthleteProfileValidation.validateFormData, profileController.addEducation);
router.post("/profile/edit-education", isAthleteAuthenticated, AthleteProfileValidation.editEducation, AthleteProfileValidation.validateFormData, profileController.editEducation);
router.post("/profile/remove-education", isAthleteAuthenticated, AthleteProfileValidation.removeEducation, AthleteProfileValidation.validateFormData, profileController.deleteEducation);



export default router;