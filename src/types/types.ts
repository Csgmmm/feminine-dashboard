
//Logs
export type Pain = "cramps" | "headache" | "breast" | "none";
export type Mood = "sensitive" | "energetic" | "calm" | "happy" | "irritable" | "anxious";
export type Cravings = "chocolate" | "sugar" | "carbs" | "salt" | "none";
export type Energy = "low" | "medium" | "high";
export type Skin = "oily" | "acne" | "sensitive" | "dry" | "clear";
export type Hair = "oily" | "dry" | "normal";

export type Bleeding = {
    intensity?: "none" | "light" | "medium" | "spotting" | "heavy";
}

export type Activity = {
    sleep_hours?: number;
    exercise?: boolean;
}

export interface ILogs {
    id: string;
    date: string;
    bleeding?: Bleeding;
    pain?: Pain[];
    mood?: Mood[];
    cravings?: Cravings[];
    energy?: Energy[];
    skin?: Skin[];
    hair?: Hair[];
    activity?: Activity;
    notes?: string;
}

//Cycles
export interface ICycles {
   id: string;
   startDate: string;
   endDate: string;
   length: number;
   is_unusual: boolean; 
}

//Users
export interface IUsers {
   name: string;
   email: string;
   avatar: string;
   id: string;
}