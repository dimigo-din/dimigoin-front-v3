import { AttendanceLog, Doc } from '../constants/types';
import { formatRequestableDate } from '../utils';
import { api } from './api';
import { RegisteringAttendanceLog } from './interfaces';

export const getMyAttendanceLog = (): Promise<Doc<AttendanceLog>[]> =>
  api<'attendanceLogList'>('GET', '/attendance').then((d) => d.logs);

export const registerMovingHistory = (placeId: string, reason?: string) =>
  api<'registerMovingHistory'>('POST', '/attendance', {
    place: placeId,
    ...(reason && {
      remark: reason,
    }),
  }).then((d) => d.attendanceLog);

const today = new Date();
const todayString = formatRequestableDate(today);

// const myData = getMyData()
// const myGrade = myData.then(d => d.grade)
// const myClass = myData.then(d => d.class)

export const getWholeClassAttendanceLog = (grade: number, clas: number) =>
  api<'wholeClassAttendanceLog'>(
    'GET',
    `/attendance/date/${todayString}/grade/${grade}/class/${clas}/status`,
  ).then((e) => e.status.sort((a, b) => a.student.serial - b.student.serial));

export const getTimelineByStudent = (studentId: number) =>
  api<'timelineByStudent'>(
    'GET',
    `/attendance/date/${todayString}/student/${studentId}`,
  ).then((e) => e.logs);

export const getTimelineByClass = (grade: number, clas: number) =>
  api<'timelineByClass'>('GET', `/attendance/date/${todayString}/grade/${grade}/class/${clas}/timeline`)
    .then(e => e.logs)

export const registerOtherStudentMovingHistory = (
  studentId: number,
  log: RegisteringAttendanceLog,
) =>
  api<'registerOtherStudentMovingHistory'>(
    'POST',
    `/attendance/student/${studentId}`,
    log,
  ).then((e) => e.attendanceLog);

// export const getMyClassAttendanceLog = async () => getWholeClassAttendanceLog(await myGrade, await myClass)
