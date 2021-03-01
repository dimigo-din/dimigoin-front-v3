import { SelfStudyTime, SelfStudyTimeEngKor } from '../constants/types';

export const selfStudyTimesToString = (times: SelfStudyTime[]): string =>
  [...times]
    .sort()
    .map((time) => SelfStudyTimeEngKor[time])
    .reduce(
      (acced, current) =>
        acced[acced.length - 1]?.[0] === current[0]
          ? [...acced, current[current.length - 1]]
          : [...acced, current],
      [] as string[],
    )
    .join(' ');
