import { AllMeal, GetDailyMeal, Login, GetMyInfo } from "./interfaces";

interface Dummy {
    method: 'GET';
    endpoint: '/dummy';
    needAuth: true;
    req: {};
    res: {};
}

export interface APIResource {
    login: Login;
    allMeal: AllMeal;
    dailyMeal: GetDailyMeal;
    dummy: Dummy;
    getMyInfo: GetMyInfo;
}
