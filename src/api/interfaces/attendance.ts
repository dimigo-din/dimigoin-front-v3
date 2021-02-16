import { AttendanceLog, Doc } from "../../constants/types";

export interface AttendanceLogList {
    method: 'GET';
    endpoint: '/attendance';
    req: {};
    res: {
        logs: Doc<AttendanceLog>[]
    }
}

export interface RegisterMovingHistory {
    method: 'POST';
    endpoint: '/attendance';
    req: {
        place: string;
        remark?: string;
    };
    res: {
        attendanceLog: Doc<AttendanceLog>
    }
}

