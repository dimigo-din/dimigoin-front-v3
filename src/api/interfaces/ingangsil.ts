import { User } from "../../constants/types";

export interface MyApplyStatus {
    method: "GET";
    endpoint: "/ingang-application/status",
    req: {};
    res: {
        weeklyTicketCount: number;
        weeklyUsedTicket: number;
        weeklyRemainTicket: number;
        ingangMaxApplier: number
        applicationsInClass: User[]
    }
}