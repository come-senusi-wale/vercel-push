import { Types } from "mongoose";
import { AccountStatus, AccountType, IAthletesAccount, UserAchievement, UserEducation, UserExperience, UserLocation, UserStatistic } from "../../interfaces/responses/athletes/athlete.response";


class UserAccountDto implements IAthletesAccount {
    public _id: string;
    public email: string;
    public password: string ;
    public accountType: AccountType;
    public name?: string;
    public emailVerified: boolean;
    public emailOtp?: string;
    public emailOtpCreatedAt?: Date;
    public passwordOtp?: string;
    public passwordOtpCreatedAt?: Date;
    passwordOtpVerified?: boolean;
    requestForPasswordChange?: boolean;
    pushNotification: boolean;
    emailNotification: boolean;
    soundVibration: boolean;

    skill?: string | undefined;
    position?: string | undefined;
    location?: UserLocation | undefined;
    profileImg?: string | undefined;
    about?: string | undefined;
    statistic?: UserStatistic | undefined;
    achievement?: UserAchievement[] | undefined;
    experience?: UserExperience[] | undefined;
    education?: UserEducation[] | undefined;

    accountStatus: AccountStatus;

    public updatedAt?: Date;
    public createdAt?: Date;
    
    constructor(userAccount: IAthletesAccount) {
      this._id = userAccount._id;
      this.email = userAccount.email;
      this.password = userAccount.password;
      this.accountType = userAccount.accountType;
      this.name = userAccount.name;
      this.emailVerified = userAccount.emailVerified;
      this.emailOtp = userAccount.emailOtp;
      this.emailOtpCreatedAt = userAccount.emailOtpCreatedAt;
      this.passwordOtp = userAccount.passwordOtp,
      this.passwordOtpCreatedAt= userAccount.passwordOtpCreatedAt;
      this.passwordOtpVerified = userAccount.passwordOtpVerified;
      this.requestForPasswordChange = userAccount.requestForPasswordChange;
      this.pushNotification = userAccount.pushNotification;
      this.emailNotification = userAccount.emailNotification;
      this.soundVibration = userAccount.soundVibration;

      this.skill = userAccount.skill;
      this.position = userAccount.position;
      this.location = userAccount.location;
      this.profileImg = userAccount.profileImg;
      this.about = userAccount.about;
      this.statistic = userAccount.statistic;
      this.achievement = userAccount.achievement;
      this.experience = userAccount.experience;
      this.education = userAccount.education;

      this.accountStatus = userAccount.accountStatus

      this.updatedAt = userAccount.updatedAt;
      this.createdAt = userAccount.createdAt;

    }
  
    get getModel() {
      return {
        _id: this._id,
        email: this.email,
        password: this.password,
        accountType: this.accountType,
        name: this.name,
        emailVerified: this.emailVerified,
        emailOtp: this.emailOtp,
        emailOtpCreatedAt: this.emailOtpCreatedAt,
        passwordOtp: this.passwordOtp,
        passwordOtpCreatedAt: this.passwordOtpCreatedAt,
        passwordOtpVerified: this.passwordOtpVerified,
        requestForPasswordChange: this.requestForPasswordChange,
        pushNotification: this.pushNotification,
        emailNotification: this.emailNotification,
        soundVibration: this.soundVibration,
        accountStatus: this.accountStatus,
        updatedAt: this.updatedAt ? new Date(this.updatedAt): undefined,
        createdAt: this.createdAt ? new Date(this.createdAt): undefined,
      } as IAthletesAccount
    }

    get getSecureRespons() {
        return {
          _id: this._id,
          email: this.email,
          name: this.name,
          accountType: this.accountType,
          emailVerified: this.emailVerified,
          pushNotification: this.pushNotification,
          emailNotification: this.emailNotification,
          soundVibration: this.soundVibration,
          skill: this.skill,
          position: this.position,
          location: this.location,
          profileImg: this.profileImg,
          about: this.about,
          statistic: this.statistic,
          achievement: this.achievement,
          experience: this.experience,
          education: this.education,
          accountStatus: this.accountStatus,
          updatedAt: this.updatedAt ? new Date(this.updatedAt): undefined,
          createdAt: this.createdAt ? new Date(this.createdAt): undefined,
        } as IAthletesAccount
      }
  
}

export default UserAccountDto;