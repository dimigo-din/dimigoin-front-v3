export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

interface SavedDocument {
    _id: string;
    createdAt: string;
    updatedAt: string;
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

export type Grade = | 1 | 2;

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
    grade: Grade;
    number: number;
    serial: number;
    photo: string[];
}

export interface Notice {
    targetGrade: Grade[];
    title: string;
    content: string;
    startDate: Date;
    endDate: Date;
}

export interface Teacher extends Doc<User> {
    position?: string;
    role?: string;
}
