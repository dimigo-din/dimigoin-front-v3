import { Student, Teacher, User } from '../../constants/types';

export interface GetMyInfo {
  method: 'GET';
  endpoint: '/user/me';
  req: null | undefined;
  res: {
    identity: User;
  };
}

export interface GetAllStudents {
  method: 'GET';
  endpoint: '/user/student';
  req: {};
  res: {
    students: Student[];
  };
}

export interface GetAllTeachers {
  method: 'GET';
  endpoint: '/user/teacher';
  req: {};
  res: {
    teachers: Teacher[];
  };
}
