import { AllMeal, GetDailyMeal, LoginWithInfo, GetMyInfo, LoginWithRefreshToken, MyApplyStatus } from "./interfaces";

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
    myIngangsilApplyStatus: MyApplyStatus;
}
