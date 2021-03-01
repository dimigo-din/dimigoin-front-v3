import { Student, Teacher, User } from '../constants/types';

export const isStudent = (user: User): user is Student =>
  (user as any).grade !== undefined;
export const isTeacher = (user: User): user is Teacher =>
  (user as any).role !== undefined;
