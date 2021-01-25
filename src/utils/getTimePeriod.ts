// 현재 시각이 아침인지, 오후인지, 저녁인지 구하는 함수
export enum DAILY_TIME_PERIOD {
    MORNING,
    BEFORE_NOON,
    EVENING,
}

export const getTimePeriod = () => {
    const current = new Date().getHours()
    if(current < 8) return DAILY_TIME_PERIOD.MORNING
    if(current < 14) return DAILY_TIME_PERIOD.BEFORE_NOON
    if(current < 20) return DAILY_TIME_PERIOD.EVENING
    return DAILY_TIME_PERIOD.MORNING
}
