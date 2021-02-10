import { AllMeal, GetDailyMeal, LoginWithInfo, GetMyInfo,
    LoginWithRefreshToken, RequestOutgo, GetAllStudents,
    GetAllTeachers, MyApplyStatus,
    ApplyIngangsil, UnapplyIngangsil, AllNotices, Timetable, GetNoticeById, RegisterNotice } from "./interfaces";

interface Dummy {
    method: 'GET';
    endpoint: '/dummy';
    needAuth: true;
    req: {};
    res: {};
}

export interface APIResource {
    loginWithInfo: LoginWithInfo;
    loginWithRefreshToken: LoginWithRefreshToken;
    allMeal: AllMeal;
    dailyMeal: GetDailyMeal;
    dummy: Dummy;
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
}
