import { CirclePeriod } from './types';

export const days = ['월', '화', '수', '목', '금', '토', '일'];

export const CircleApplicationStatusValues = [
  'applied',
  'document-fail',
  'document-pass',
  'interview-fail',
  'interview-pass',
  'final',
] as const;

export const CircleApplicationStatusLevelTree = {
  [CirclePeriod.application]: [
    CircleApplicationStatusValues[1],
    CircleApplicationStatusValues[2],
  ],
  [CirclePeriod.interview]: [
    CircleApplicationStatusValues[3],
    CircleApplicationStatusValues[4],
  ],
  [CirclePeriod.final]: null,
};

export const dayEngKorMapper = {
  mon: '월',
  tue: '화',
  wed: '수',
  thr: '목',
  fri: '금',
  sat: '토',
  sun: '일',
};

export const circleApplicationStatusKorMapper = {
  applied: '지원함',
  'document-fail': '서류 탈락',
  'document-pass': '서류 합격',
  'interview-fail': '면접 탈락',
  'interview-pass': '면접 합격',
  final: '최종 선택',
};

export const engDays = Object.keys(dayEngKorMapper);

export const SMALL_SCREEN_THRESHOLD = 840;

export const SCHOOL_API_SERVER =
  process.env.REACT_APP_SCHOOL_API_SERVER ||
  (() => {
    throw new Error('Cannot find School API Server URI (Student Database)');
  })();
