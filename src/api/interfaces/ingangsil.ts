import { Doc, DownloadbleFile, NightSelfStudyTime, Student } from "../../constants/types";

export interface HourAndMinute {
    hour: number;
    minute: string;
}

export interface IngangApplyPeriod {
    start: HourAndMinute,
    end: HourAndMinute,
}

export interface NightSelfStudyTimeRanges {
    NSS1: string;
    NSS2: string;
};

export interface MyApplyStatus {
    method: "GET";
    endpoint: "/ingang-application/status",
    req: {};
    res: {
        weeklyTicketCount: number;
        weeklyUsedTicket: number;
        weeklyRemainTicket: number;
        ingangMaxApplier: number;
        applicationsInClass: Doc<{
            date: string;
            time: keyof typeof NightSelfStudyTime;
            applier: Student;
        }>[],
        nightSelfStudyTimes: NightSelfStudyTimeRanges;
        ingangApplyPeriod: IngangApplyPeriod;
    }
}

export interface ApplyIngangsil {
    method: "POST";
    endpoint: "/ingang-application/time/:time",
    req: {};
    res: {
        date: string;
        time: number;
        applier: string;
    }
}

export interface UnapplyIngangsil {
    method: "DELETE";
    endpoint: "/ingang-application/time/:time",
    req: {};
    res: {
        date: string;
        time: number;
        applier: string;
    }
}

export interface RequestExcelFile {
    endpoint: '/ingang-application/export/grade/:grade';
    method: 'GET';
    req: {};
    res: {
        exportedFile: Doc<DownloadbleFile>
    }
}
