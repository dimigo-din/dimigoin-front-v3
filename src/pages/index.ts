import loadable from '@loadable/component';

export const Main = loadable(() => import('./Main'));
export const Login = loadable(() => import('./Login'));
export const Notices = loadable(() => import('./Notice'));
export const Dets = loadable(() => import('./Dets/Applier'));
export const IngangsilManager = loadable(() => import('./Ingangsil/Manage'));
export const Ingangsil = {
  Student: loadable(() => import('./Ingangsil/Student')),
  Teacher: IngangsilManager,
};
export const Afterschool = {
  Student: loadable(() => import('./Afterschool/Student')),
  Teacher: loadable(() => import('./Afterschool/Teacher')),
};
export const Circle = {
  Student: loadable(() => import('./Circle/Student')),
  Teacher: loadable(() => import('./Circle/Teacher')),
};
export const Outgo = loadable(() => import('./Outgo'));
export const SelfStudyDisplay = loadable(() => import('./SelfStudyDisplay'));
export const Mentoring = {
  Student: loadable(() => import('./Mentoring/Student')),
  Teacher: loadable(() => import('./Mentoring/Teacher')),
};
