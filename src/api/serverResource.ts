import { AllMeal, GetDailyMeal, Login } from "./interfaces";

interface Dummy {
    method: 'GET';
    endpoint: '/dummy';
    needAuth: true;
    req: {};
    res: {};
}

export interface PostResource {
    login: Login;
}

export interface GetResource {
    allMeal: AllMeal;
    dailyMeal: GetDailyMeal;
    dummy: Dummy;
}