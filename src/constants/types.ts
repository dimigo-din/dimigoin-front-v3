interface SavedDocument {
    _id: string;
}

export type Doc<Obj> = Obj & SavedDocument

export interface BriefStudent {
    name: string;
    studentId: string;
    userId: string;
}

export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

export enum UserType {
    T = "T",
    S = "S",
}

export enum Gender {
    M = "M",
    F = "F",
}

export enum NightSelfStudyTime {
    NSS1 = "NSS1",
    NSS2 = "NSS2"
}

export interface IngangsilTicket extends SavedDocument {
    date: string;
    time: keyof typeof NightSelfStudyTime;
    applier: Student;
}

export interface User {
    idx: number;
    username: string;
    userType: UserType;
    gender: Gender;
    name: string;
}

export interface Student extends Doc<User> {
    class: number;
    grade: number;
    number: number;
    serial: number;
    photo: string[];
}

export interface Teacher extends Doc<User> { }
