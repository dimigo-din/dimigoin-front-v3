import { Circle, CircleApplication, Doc } from "../../constants/types";

export interface AllCircle {
    endpoint: '/circle';
    method: 'GET';
    req: {};
    res: {
        circles: Doc<Circle>[]
    }
}

export interface AppliedCircle {
    endpoint: '/circle-application';
    method: 'GET';
    req: {};
    res: {
        maxApplyCount: number;
        applications: Doc<CircleApplication>[]
    }
}
