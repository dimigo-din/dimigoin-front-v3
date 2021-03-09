import { CircleApplicationStatusValues } from '.';

export type Merge<M, N> = Omit<M, Extract<keyof M, keyof N>> & N;

interface SavedDocument {
  _id: string;
  createdAt: string;
  updatedAt: string;
}

export type Doc<Obj> = Obj & SavedDocument;

export interface BriefStudent {
  name: string;
  studentId: string;
  userId: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export type Grade = 1 | 2 | 3;

export enum EngDay {
  'mon' = 'mon',
  'tue' = 'tue',
  'wed' = 'wed',
  'thr' = 'thr',
  'fri' = 'fri',
  'sat' = 'sat',
  'sun' = 'sun',
}

export enum UserType {
  T = 'T',
  S = 'S',
}

export enum Gender {
  M = 'M',
  F = 'F',
}

export interface HourAndMinute {
  hour: number;
  minute: string;
}

export enum NightSelfStudyTimeKey {
  NSS1 = 'NSS1',
  NSS2 = 'NSS2',
}

export enum AfterschoolSelfStudyTime {
  AFSC1 = 'AFSC1',
  AFSC2 = 'AFSC2',
}

export enum SelfStudyTime {
  AFSC1 = 'AFSC1',
  AFSC2 = 'AFSC2',
  NSS1 = 'NSS1',
  NSS2 = 'NSS2',
}

export enum SelfStudyTimeEngKor {
  AFSC1 = '방과후1',
  AFSC2 = '방과후2',
  NSS1 = '야자1',
  NSS2 = '야자2',
}

export interface IngangApplyPeriod {
  start: HourAndMinute;
  end: HourAndMinute;
}

// export type SelfStudyTime = NightSelfStudyTime | AfterschoolSelfStudyTime

export interface IngangsilTicket extends SavedDocument {
  date: string;
  time: NightSelfStudyTimeKey;
  applier: Student;
}

export enum Permission {
  'ingang-application' = 'ingang-application',
  attendance = 'attendance',
  'circle-applier-selection' = 'circle-applier-selection',
  circle = 'circle'
}

export interface User {
  idx: number;
  username: string;
  userType: UserType;
  gender: Gender;
  name: string;
  permissions: Permission[];
  photos: string[];
}

export interface Student extends Doc<User> {
  class: number;
  grade: Grade;
  number: number;
  serial: number;
}

export interface Notice {
  targetGrade: Grade[];
  title: string;
  content: string;
  startDate: Date;
  endDate: Date;
  author?: User;
}

export interface DailyMeal {
  breakfast: string[];
  lunch: string[];
  dinner: string[];
  date: string;
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
  place?: Doc<Place>;
  remark: string;
  updatedBy: User | null;
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
  targetClasses: number[];
  days: (keyof typeof EngDay)[];
  description: string;
  targetGrades: Grade[];
  name: string;
  teacher: Teacher;
  times: SelfStudyTime[];
  place: Doc<Place>;
  applierCount: number;
}

export interface AfterschoolClassApplication {
  applier: string;
  afterschool: Doc<AfterschoolClass>;
}

export enum CirclePeriod {
  submitting = 'SUBMITTING',    // 기초정보 등록기간
  registering = 'REGISTERING',  // 상세정보 입력기간
  application = 'APPLICATION',
  screening = 'SCREENING', // 서류심사
  interview = 'INTERVIEW',
  final = 'FINAL',
}

export interface ServiceConfig {
  CIRCLE_PERIOD: CirclePeriod;
  CIRCLE_MAX_APPLY: number;
  IS_MOVING_CLASS_SYSTEM: boolean;
  CIRCLE_CATEGORY: string[];
}

export interface Circle {
  name: string;
  imageUrl: string;
  description: string;
  chair: Doc<Student>;
  viceChair: Doc<Student>;
  category: string;
  applied?: boolean;
  fullName?: string;
}

export interface CircleApplication {
  status: typeof CircleApplicationStatusValues[number];
  circle: Doc<Circle>;
  form: Record<string, string>;
  applier: string;
}

export interface CircleApplyQuestionItem {
  question: string;
  maxLength: number;
}

export interface Mentoring {
  days: EngDay[];
  targetGrade: Grade;
  name: string;
  teacher: Teacher;
  subject: string;
  duration: {
    start: HourAndMinute;
    end: HourAndMinute;
  };
}

export interface MentoringSchedule extends Mentoring {
  date: string;
  applied: boolean;
}

export interface MentoringApplication {
  date: string;
  applier: Student;
  mentoring: Doc<Mentoring>;
}
