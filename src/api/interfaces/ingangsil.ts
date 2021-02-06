import { Doc, NightSelfStudyTime, Student, User } from "../../constants/types";

export interface MyApplyStatus {
    method: "GET";
    endpoint: "/ingang-application/status",
    req: {};
    res: {
        weeklyTicketCount: number;
        weeklyUsedTicket: number;
        weeklyRemainTicket: number;
        ingangMaxApplier: number
        applicationsInClass: Doc<{
            date: string;
            time: keyof typeof NightSelfStudyTime;
            applier: Student;
        }>[]
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
