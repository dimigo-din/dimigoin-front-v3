export interface AuthTokens {
    accessToken: string;
    refreshToken: string;
}

interface Login {
    method: 'POST';
    endpoint: '/auth',
    req: {
        username: string;
        password: string;
    }
    res: AuthTokens
}

export interface DailyMeal {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    date: string;
}

interface AllMeal {
    method: 'GET';
    endpoint: '/meal';
    needAuth: false;
    req: {};
    res: {
        meals: DailyMeal[]
    }
}

interface GetDailyMeal {
    method: 'GET';
    endpoint: string;
    needAuth: false;
    req: {};
    res: {
        meal: DailyMeal;
    }
}

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