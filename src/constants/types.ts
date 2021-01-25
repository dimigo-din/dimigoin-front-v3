export interface Student {
    name: string;
    studentId: string;
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

export interface MyData {
    idx: number;
    username: string;
    name: string;
    userType: UserType;
    gender: Gender;
    createdAt: string;
    updatedAt: string;
    class: number;
    grade: number;
    number: number;
    serial: number;
    photo: string[];
}