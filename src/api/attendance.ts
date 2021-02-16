import { api } from "./api";

export const getMyAttendanceLog = () => api<"attendanceLog">("GET", "/attendance").then(d => d.logs)

// export const registerMovingHistory = () => api<"registerMovingHistory">("POST", "/attendance", {
//     place: 
// }).then(d => d.logs)
