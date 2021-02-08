import { Doc, Grade, Notice } from "../../constants/types";

export interface AllNotices {
  endpoint: '/notice';
  method: 'GET';
  req: {};
  res: {
    notices: Doc<Notice>[]
  }
}