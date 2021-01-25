export interface DailyMeal {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
    date: string;
}

export interface AllMeal {
    method: 'GET';
    endpoint: '/meal';
    needAuth: false;
    req: {};
    res: {
        meals: DailyMeal[]
    }
}

export interface GetDailyMeal {
    method: 'GET';
    endpoint: string;
    needAuth: false;
    req: {};
    res: {
        meal: DailyMeal;
    }
}