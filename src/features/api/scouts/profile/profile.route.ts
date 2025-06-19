import express from "express";
const router = express.Router();
import ProfileController from "./profile.controller";
import ProfileService from "./profile.service";
import { ScoutProfileValidation } from "./profile.validation";
import { isScoutAuthenticated } from "../../../../shared/services/middleware/user.middleware";
import AuthModel from "../../../../shared/services/database/athletes/auth/index";
import { singleFileUpload } from "../../../../shared/services/middleware/fileUpload.middleware";



const authModel = new AuthModel()
const profileService = new ProfileService({ authModel })
const profileController = new ProfileController({profileService})

router.get("/profile", isScoutAuthenticated, profileController.getProfile);
router.post("/profile-bio", isScoutAuthenticated, ScoutProfileValidation.bio, ScoutProfileValidation.validateFormData, profileController.editBio);
router.post("/profile-img", isScoutAuthenticated, singleFileUpload('picture', ['image']), profileController.editProfileImg);
router.post("/profile-about", isScoutAuthenticated, ScoutProfileValidation.about, ScoutProfileValidation.validateFormData, profileController.editAbout);

router.post("/profile/add-sports", isScoutAuthenticated, ScoutProfileValidation.addSports, ScoutProfileValidation.validateFormData, profileController.addSport);
router.post("/profile/remove-sports", isScoutAuthenticated, ScoutProfileValidation.removeSports, ScoutProfileValidation.validateFormData, profileController.deleteSport);

router.post("/profile/add-look-for", isScoutAuthenticated, ScoutProfileValidation.addLookFor, ScoutProfileValidation.validateFormData, profileController.addLookFor);
router.post("/profile/remove-look-for", isScoutAuthenticated, ScoutProfileValidation.removeLookFor, ScoutProfileValidation.validateFormData, profileController.deleteLookFor);





export default router;