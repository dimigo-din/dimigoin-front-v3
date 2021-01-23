interface Login {
    method: 'POST';
    endpoint: 'login',
    req: {
        username: string;
        password: string;
    }
    res: {
        accessToken: string;
        refreshToken: string;
    }
}

interface Meal {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    date: string;
}

interface AllMeal {
    method: 'GET';
    endpoint: '/meal';
    req: {};
    res: {
        meals: Meal[]
    }
}

interface DailyMeal {
    method: 'GET';
    endpoint: string;
    req: {};
    res: {
        meal: Meal;
    }
}

export interface PostResource {
    login: Login;
}

export interface GetResource {
    allMeal: AllMeal;
    dailyMeal: DailyMeal;
}