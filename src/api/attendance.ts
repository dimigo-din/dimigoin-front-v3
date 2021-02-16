import { AttendanceLog, Doc } from "../constants/types";
import { api } from "./api";

export const getMyAttendanceLog = (): Promise<Doc<AttendanceLog>[]> =>
    api<"attendanceLogList">("GET", "/attendance").then(d => d.logs)

export const registerMovingHistory = (placeId: string, reason: string): Promise<Doc<AttendanceLog>> =>
    api<"registerMovingHistory">("POST", "/attendance", {
        place: placeId,
        remark: reason
    }).then(d => d.attendanceLog)
