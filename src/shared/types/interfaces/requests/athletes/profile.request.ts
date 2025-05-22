export interface IEditBioRequest {
    name: string;
    skill: string;
    position: string;
    country: string;
    city: string;
}

export interface IAddAchievementRequest {
    title: string;
    sport: string;
    date: Date;
    description: string;
}

export interface IEditAchievementRequest {
    achievementId: any;
    title: string;
    sport: string;
    date: Date;
    description: string;
}

export interface IAddExperienceRequest {
    title: string;
    sport: string;
    date: Date;
    description: string;
}

export interface IEditExperienceRequest {
    experienceId: any;
    title: string;
    sport: string;
    date: Date;
    description: string;
}

export interface IAddEducationRequest {
    school: string;
    degree: string;
    field: string;
    startDate: Date;
    endDate: Date | string;
    description?: string;
}

export interface IEditEducationRequest {
    educationId: any;
    school: string;
    degree: string;
    field: string;
    startDate: Date;
    endDate: Date | string;
    description?: string;
}


export interface IAddStatisticRequest {
    height: string;
    weight: string;
    bodyFat: string;
    BMI: string;
    maxHeight: string;
    v02Max: string;
    sprintSpeed: string;
    verticalJump: string;
    agility: string;
}
