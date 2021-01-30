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

export interface User {
    idx: number;
    username: string;
    name: string;
    userType: UserType;
    gender: Gender;
    class: number;
    grade: number;
    number: number;
    serial: number;
    photo: string[];
}