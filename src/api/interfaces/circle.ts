import { CircleApplicationStatusValues } from "../../constants";
import { Circle, CircleApplication, CircleApplyQuestionItem, Doc, Merge, Student } from "../../constants/types";

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

export interface ApplyQuestion {
    endpoint: '/circle-application/form';
    method: 'GET';
    req: {};
    res: {
        form: Doc<CircleApplyQuestionItem>[]
    }
}

export interface ApplyCircle {
    endpoint: '/circle-application';
    method: 'POST';
    req: {
        circle: string;
        form: Record<string, string>;
    }
    res: {
        circleApplication: Doc<CircleApplication & {
            circle: string;
        }>;
    };
}

export type ApplicationForSubmiter = Merge<CircleApplication, {
    circle: string;
    applier: Student;
}>

export interface CircleApplications {
    endpoint: '/circle-applier-selection';
    method: 'GET';
    req: {};
    res: {
        applications: Doc<ApplicationForSubmiter>[]
    }
}

export interface SetApplicationStatus {
    endpoint: '/circle-applier-selection/:applicationId';
    method: 'PATCH';
    req: {
        status: typeof CircleApplicationStatusValues[number];
    }
    res: {
        application: Doc<ApplicationForSubmiter>;
    }
}

export interface FinalSelect {
    endpoint: '/circle-application/:applicationId/final';
    method: 'PATCH';
    req: {};
    res: {
        application: Doc<CircleApplication>;
    }
}