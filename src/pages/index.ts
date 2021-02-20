import loadable from '@loadable/component';

export const Main = loadable(() => import('./Main'));
export const Login = loadable(() => import('./Login'));
export const Notices = loadable(() => import('./Notice'));
export const IngangsilManager = loadable(() => import('./Ingangsil/Manage'));
export const Ingangsil = {
    Student: loadable(() => import('./Ingangsil/Student')),
    Teacher: IngangsilManager
};
export const Afterschool = loadable(() => import('./Afterschool/Student'))
export const Outgo = loadable(() => import('./Outgo'));
export const SelfStudyDisplay = loadable(() => import('./SelfStudyDisplay'));
export const Mentoring = loadable(() => import('./Mentoring'));
