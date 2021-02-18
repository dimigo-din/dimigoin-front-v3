import { AttendanceLog, Doc } from "../constants/types";
import { formatRequestableDate } from "../utils";
import { api } from "./api";
import { getMyData } from "./user";

export const getMyAttendanceLog = (): Promise<Doc<AttendanceLog>[]> =>
    api<"attendanceLogList">("GET", "/attendance").then(d => d.logs)

export const registerMovingHistory = (placeId: string, reason?: string): Promise<Doc<AttendanceLog>> =>
    api<"registerMovingHistory">("POST", "/attendance", {
        place: placeId,
        ...(reason && {
            remark: reason
        })
    }).then(d => d.attendanceLog)

const today = new Date()
const todayString = formatRequestableDate(today)

const myData = getMyData()
const myGrade = myData.then(d => d.grade)
const myClass = myData.then(d => d.class)

export const getWholeClassAttendanceLog = (grade: number, clas: number) =>
    api<"wholeClassAttendanceLog">("GET", `/attendance/date/${todayString}/grade/${grade}/class/${clas}`).then(e => e.status.sort((a, b) => a.student.serial - b.student.serial))

export const getMyClassAttendanceLog = async () => getWholeClassAttendanceLog(await myGrade, await myClass)
