import { AttendanceLog, AttendanceLogWithStudent, Doc } from "../../constants/types";

export interface RegisteringAttendanceLog {
    place: string;
    remark?: string;
}

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
    req: RegisteringAttendanceLog;
    res: {
        attendanceLog: Doc<AttendanceLog>
    }
}

export interface WholeClassAttendanceLog {
    method: 'GET';
    endpoint: '/attendance/date/:date/grade/:grade/class/:class';
    req: {};
    res: {
        status: AttendanceLogWithStudent[]
    }
}

export interface TimelineByStudent {
    method: 'GET';
    endpoint: '/attendance/date/:date/student/:studentId';
    req: {};
    res: {
        logs: (Doc<AttendanceLog> & {
            place: string;
            student: string;
        })[]
    }
}

export interface RegisterOtherStudentMovingHistory {
    endpoint: '/attendance/student/:studentId';
    method: 'POST';
    req: RegisteringAttendanceLog;
    res: {
        attendanceLog: Doc<AttendanceLog>
    }
}
