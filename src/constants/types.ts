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

export enum EngDay {
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
    "sun"
}

export enum UserType {
    T = "T",
    S = "S",
}

export enum Gender {
    M = "M",
    F = "F",
}

export interface HourAndMinute {
    hour: number;
    minute: string;
}

export enum NightSelfStudyTimeKey {
    NSS1 = "NSS1",
    NSS2 = "NSS2"
}

export enum AfterschoolSelfStudyTime {
    AFSC1 = "AFSC1",
    AFSC2 = "AFSC2",
}

export enum SelfStudyTime {
    AFSC1 = "AFSC1",
    AFSC2 = "AFSC2",
    NSS1 = "NSS1",
    NSS2 = "NSS2"
}

export interface IngangApplyPeriod {
    start: HourAndMinute,
    end: HourAndMinute,
}

// export type SelfStudyTime = NightSelfStudyTime | AfterschoolSelfStudyTime

export interface IngangsilTicket extends SavedDocument {
    date: string;
    time: NightSelfStudyTimeKey;
    applier: Student;
}

export enum Permission {
    "ingang-application" = "ingang-application"
}

export interface User {
    idx: number;
    username: string;
    userType: UserType;
    gender: Gender;
    name: string;
    permissions: Permission[]
}

export interface Student extends Doc<User> {
    class: number;
    grade: Grade;
    number: number;
    serial: number;
    photos: string[];
}

export interface Notice {
    targetGrade: Grade[];
    title: string;
    content: string;
    startDate: Date;
    endDate: Date;
}

export interface Place {
    label: string;
    type: string;
    name: string;
    location: string;
}

export interface AttendanceLog {
    student: Doc<Student>;
    date: string;
    place: Doc<Place>;
    remark: string;
}

export interface AttendanceLogWithStudent {
    student: Doc<Student>;
    log: AttendanceLog | null;
}

export interface Teacher extends Doc<User> {
    position?: string;
    role?: string;
}

export interface DownloadbleFile {
    downloadLimit: number;
    downloadCount: number;
    name: string;
    extension: string;
    owner: string;
    _id: string;
    // id가 꼭 필요한 특수케이스입니다,,
}

export interface AfterschoolClass {
    capacity: number;
    class: number;
    day: (keyof typeof EngDay)[];
    description: string;
    grade: Grade[]
    name: string;
    teacher: string;
    time: SelfStudyTime[];
}
