export interface AttendanceLog {
    method: 'GET';
    endpoint: '/attendance';
    req: {};
    res: {
        logs: unknown[]
    }
}

export interface RegisterMovingHistory {
    method: 'POST';
    endpoint: '/attendance';
    req: {
        place: string;
        remark: string;
    };
    res: {
        attendanceLog: unknown[]
    }
}

