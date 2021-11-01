import {
  AllMeal,
  GetDailyMeal,
  LoginWithInfo,
  GetMyInfo,
  LoginWithRefreshToken,
  RequestOutgo,
  GetAllStudents,
  GetAllTeachers,
  MyApplyStatus,
  ApplyIngangsil,
  UnapplyIngangsil,
  AllNotices,
  Timetable,
  GetNoticeById,
  RegisterNotice,
  CurrentNotices,
  RemoveNotice,
  EditRegisteredNotice,
  AttendanceLogList,
  RegisterMovingHistory,
  PrimaryPlaceList,
  PlaceList,
  WholeClassAttendanceLog,
  TimelineByStudent,
  RequestExcelFile,
  EntireTicket,
  AfterschoolList as AfterschoolClassList,
  EditAfterschoolClassInfo,
  RegisterNewAfterschoolClass,
  RequestSheetByGrade,
  AppliedAfterschoolClasses,
  ApplyAfterschoolClass,
  UnapplyAfterschoolClass,
  RemoveAfterschoolClass,
  RegisterOtherStudentMovingHistory,
  WeeklyMeals,
  AllCircle,
  AppliedCircle,
  ApplyCircle,
  ApplyQuestion,
  CircleApplications,
  FinalSelect,
  SetApplicationStatus,
  ApplyMentoring,
  DeleteMentoringProgram,
  EditMentoringInfo,
  MentoringList,
  NewMentoringProgram,
  RequestableMentoringList,
  RequestMentoringApplyInfoSheet,
  AppliedMentoring,
  UnapplyMentoring,
  CreateCircle,
  GetCircleById,
  GetMyCircle,
  EditCircle,
  TimelineByClass,
  RegisterWeeklyMeal,
} from './interfaces';
import { Config } from './interfaces/config';

export interface APIResource {
  loginWithInfo: LoginWithInfo;
  loginWithRefreshToken: LoginWithRefreshToken;
  allMeal: AllMeal;
  dailyMeal: GetDailyMeal;
  getMyInfo: GetMyInfo;
  requestOutgo: RequestOutgo;
  getAllStudents: GetAllStudents;
  getAllTeachers: GetAllTeachers;
  myIngangsilApplyStatus: MyApplyStatus;
  applyIngangsil: ApplyIngangsil;
  unapplyIngangsil: UnapplyIngangsil;
  allNotices: AllNotices;
  timetable: Timetable;
  getNoticeById: GetNoticeById;
  registerNotice: RegisterNotice;
  currentNotices: CurrentNotices;
  removeNotice: RemoveNotice;
  editRegisteredNotice: EditRegisteredNotice;
  attendanceLogList: AttendanceLogList;
  registerMovingHistory: RegisterMovingHistory;
  primaryPlaceList: PrimaryPlaceList;
  placeList: PlaceList;
  wholeClassAttendanceLog: WholeClassAttendanceLog;
  timelineByStudent: TimelineByStudent;
  requestExcelFile: RequestExcelFile;
  entierTicket: EntireTicket;
  afterschoolClassList: AfterschoolClassList;
  editAfterschoolClassInfo: EditAfterschoolClassInfo;
  registerNewAfterschoolClass: RegisterNewAfterschoolClass;
  requestSheetByGrade: RequestSheetByGrade;
  appliedAfterschoolClasses: AppliedAfterschoolClasses;
  applyAfterschoolClass: ApplyAfterschoolClass;
  unapplyAfterschoolClass: UnapplyAfterschoolClass;
  removeAfterschoolClass: RemoveAfterschoolClass;
  registerOtherStudentMovingHistory: RegisterOtherStudentMovingHistory;
  weeklyMeals: WeeklyMeals;
  config: Config;
  allCircle: AllCircle;
  appliedCircle: AppliedCircle;
  applyQuestion: ApplyQuestion;
  applyCircle: ApplyCircle;
  circleApplications: CircleApplications;
  setApplicationStatus: SetApplicationStatus;
  finalSelect: FinalSelect;
  mentoringList: MentoringList;
  requestableMentoringList: RequestableMentoringList;
  applyMentoring: ApplyMentoring;
  newMentoringProgram: NewMentoringProgram;
  editMentoringInfo: EditMentoringInfo;
  deleteMentoringProgram: DeleteMentoringProgram;
  requestMentoringApplyInfoSheet: RequestMentoringApplyInfoSheet;
  appliedMentoring: AppliedMentoring;
  unapplyMentoring: UnapplyMentoring;
  createCircle: CreateCircle;
  getCircleById: GetCircleById;
  getMyCircle: GetMyCircle;
  editCircle: EditCircle;
  timelineByClass: TimelineByClass;
  registerWeeklyMeal: RegisterWeeklyMeal;
}
