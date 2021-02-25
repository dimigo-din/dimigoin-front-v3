import {
    AllMeal, GetDailyMeal, LoginWithInfo, GetMyInfo, LoginWithRefreshToken,
    RequestOutgo, GetAllStudents, GetAllTeachers, MyApplyStatus,
    ApplyIngangsil, UnapplyIngangsil, AllNotices, Timetable, GetNoticeById,
    RegisterNotice, CurrentNotices, RemoveNotice, EditRegisteredNotice,
    AttendanceLogList, RegisterMovingHistory, PrimaryPlaceList, PlaceList,
    WholeClassAttendanceLog, TimelineByStudent, RequestExcelFile, EntireTicket,
    AfterschoolList as AfterschoolClassList, EditAfterschoolClassInfo,
    RegisterNewAfterschoolClass, RequestSheetByGrade, AppliedAfterschoolClasses,
    ApplyAfterschoolClass, UnapplyAfterschoolClass, RemoveAfterschoolClass,
    RegisterOtherStudentMovingHistory, WeeklyMeals
} from "./interfaces";
import { AllCircle, AppliedCircle, ApplyCircle, ApplyQuestion } from "./interfaces/circle";
import { Config } from "./interfaces/config";

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
}
