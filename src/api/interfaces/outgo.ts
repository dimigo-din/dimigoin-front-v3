export interface OutgoRequestForm {
  applier: number[];
  approver: number;
  reason: string;
  detailReason?: string;
  duration: {
    start: Date;
    end: Date;
  };
}

export interface RequestOutgo {
  method: 'POST';
  endpoint: '/outgo-request';
  req: OutgoRequestForm;
  res: {};
}
