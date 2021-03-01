import { Doc, Merge, Notice, User } from '../../constants/types';

export type APIDocNotice = Merge<
  Notice,
  {
    startDate: string;
    endDate: string;
    author?: User;
  }
>;

export interface AllNotices {
  endpoint: '/notice';
  method: 'GET';
  req: {};
  res: {
    notices: Doc<APIDocNotice>[];
  };
}

export interface GetNoticeById {
  endpoint: '/notice/:id';
  method: 'GET';
  req: {};
  res: {
    notice: Doc<APIDocNotice>;
  };
}

export interface RegisterNotice {
  endpoint: '/notice';
  method: 'POST';
  req: APIDocNotice;
  res: {
    notice: Doc<APIDocNotice>;
  };
}

export interface EditRegisteredNotice {
  endpoint: '/notice/:id';
  method: 'PATCH';
  req: APIDocNotice;
  res: {
    notice: Doc<APIDocNotice>;
  };
}

export interface CurrentNotices {
  endpoint: '/notice';
  method: 'GET';
  req: {};
  res: {
    notices: Doc<APIDocNotice>[];
  };
}

export interface RemoveNotice {
  endpoint: '/notice/:id';
  method: 'DELETE';
  req: {};
  res: {
    notice: Doc<APIDocNotice>;
  };
}
