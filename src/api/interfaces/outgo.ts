export interface OutgoRequestForm {
  applier: string[];
  approver: string;
  reason: string;
  detailReason?: string;
  duration: {
    start: Date;
    end: Date;
  }
}

export interface RequestOutgo {
    method: "POST";
    endpoint: "/outgo-request";
    req: OutgoRequestForm;
    res: {

    }
}