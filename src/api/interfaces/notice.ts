import { Doc, Grade } from "../../constants/types";

export interface AllNotices {
    endpoint: '/notice';
    method: 'GET';
    req: {};
    res: {
        notices: 
          Doc<{
            targetGrade: Grade[];
            title: string;
            content: string;
            startDate: Date;
            endDate: Date;
          }>[]
      }
}