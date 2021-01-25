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