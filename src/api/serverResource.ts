import {
    AllMeal, GetDailyMeal, LoginWithInfo, GetMyInfo, LoginWithRefreshToken,
    RequestOutgo, GetAllStudents, GetAllTeachers, MyApplyStatus,
    ApplyIngangsil, UnapplyIngangsil, AllNotices, Timetable, GetNoticeById,
    RegisterNotice, CurrentNotices, RemoveNotice, EditRegisteredNotice,
    AttendanceLogList, RegisterMovingHistory, PrimaryPlaceList, PlaceList,
    WholeClassAttendanceLog, TimelineByStudent, RequestExcelFile, EntireTicket
} from "./interfaces";
import { AfterschoolList as AfterschoolClassList, EditAfterschoolClassInfo } from "./interfaces/afterschool";

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
}
