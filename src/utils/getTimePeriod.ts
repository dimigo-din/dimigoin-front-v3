import { SelfStudyTime } from '../constants/types';

// 현재 시각이 아침인지, 오후인지, 저녁인지 구하는 함수
export enum DAILY_TIME_PERIOD {
  MORNING,
  BEFORE_NOON,
  EVENING,
}

export const getTimePeriod = () => {
  const current = new Date().getHours();
  if (current < 8) return DAILY_TIME_PERIOD.MORNING;
  if (current < 14) return DAILY_TIME_PERIOD.BEFORE_NOON;
  if (current < 20) return DAILY_TIME_PERIOD.EVENING;
  return DAILY_TIME_PERIOD.MORNING;
};

export const getSelfStudyPeriod = (): SelfStudyTime | null => {
  const current = new Date();
  const hour = current.getHours(),
    minute = current.getMinutes();
  const computedMinutes = hour * 60 + minute;
  // if()
  if (16 * 60 + 30 < computedMinutes && computedMinutes < 17 * 60 + 40)
    return SelfStudyTime.AFSC1;
  if (17 * 60 + 40 < computedMinutes && computedMinutes < 18 * 60 + 40)
    return SelfStudyTime.AFSC2;
  if (19 * 60 + 50 < computedMinutes && computedMinutes < 21 * 60 + 20)
    return SelfStudyTime.NSS1;
  if (21 * 60 + 20 < computedMinutes && computedMinutes < 23 * 60)
    return SelfStudyTime.NSS2;
  return null;
};
