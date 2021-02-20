import {
    Doc, DownloadbleFile, IngangApplyPeriod,
    IngangsilTicket, SelfStudyTime
} from "../../constants/types";

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
        applicationsInClass: Doc<IngangsilTicket>[],
        selfStudyTimes: Record<SelfStudyTime, IngangApplyPeriod>
        ingangApplyPeriod: IngangApplyPeriod;
    }
}

export interface ApplyIngangsil {
    method: "POST";
    endpoint: "/ingang-application/time/:time",
    res: IngangsilTicket;
    req: {};
}

export interface UnapplyIngangsil {
    method: "DELETE";
    endpoint: "/ingang-application/time/:time",
    req: {};
    res: IngangsilTicket
}

export interface EntireTicket {
    method: 'GET';
    endpoint: '/ingang-application/entire';
    req: {};
    res: {
        ingangApplications: IngangsilTicket[]
    }
}

export interface RequestExcelFile {
    endpoint: '/ingang-application/export/grade/:grade';
    method: 'POST';
    req: {};
    res: {
        exportedFile: Doc<DownloadbleFile>
    }
}
