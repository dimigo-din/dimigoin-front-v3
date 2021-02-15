import {
    AllMeal, GetDailyMeal, LoginWithInfo, GetMyInfo,
    LoginWithRefreshToken, RequestOutgo, GetAllStudents,
    GetAllTeachers, MyApplyStatus, ApplyIngangsil, UnapplyIngangsil,
    AllNotices, Timetable, GetNoticeById, RegisterNotice,
    CurrentNotices, RemoveNotice
} from "./interfaces";

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
}
