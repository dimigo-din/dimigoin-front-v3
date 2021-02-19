import loadable from '@loadable/component';

export const Main = loadable(() => import('./Main'));
export const Login = loadable(() => import('./Login'));
export const Notices = loadable(() => import('./Notice'));
export const Ingangsil = {
    Student: loadable(() => import('./Ingangsil/Student')),
    Teacher: loadable(() => import('./Ingangsil/Teacher'))
}
export const Outgo = loadable(() => import('./Outgo'));
export const SelfStudyDisplay = loadable(() => import('./SelfStudyDisplay'));
export const Mentoring = loadable(() => import('./Mentoring'));
