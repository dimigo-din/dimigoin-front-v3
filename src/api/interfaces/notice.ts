import { Doc, Notice } from "../../constants/types";

export interface AllNotices {
  endpoint: '/notice';
  method: 'GET';
  req: {};
  res: {
    notices: Doc<Notice & {
      startDate: string;
      endDate: string;
    }>[]
  }
}

export interface GetNoticeById {
  endpoint: '/notice/:id';
  method: 'GET';
  req: {};
  res: {
    notice: Doc<Notice & {
      startDate: string;
      endDate: string;
    }>
  }
}
