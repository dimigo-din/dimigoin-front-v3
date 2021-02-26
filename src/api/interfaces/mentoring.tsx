import { Doc, EngDay, Mentoring, MentoringApplication, MentoringSchedule, Merge } from "../../constants/types";

export interface MentoringList {
    endpoint: '/mentoring';
    method: 'GET';
    req: {};
    res: {
        mentorings: Doc<Mentoring>[];
    }
}

export interface RequestableMentoringList {
    endpoint: '/mentoring/requestable';
    method: 'GET';
    req: {};
    res: {
        mentorings: Doc<MentoringSchedule>[]
    }
}

export interface ApplyMentoring {
    endpoint: '/mentoring-application/:mentoringId';
    method: 'POST';
    req: {
        date: string;
    }
    res: {
        mentoringApplication: MentoringApplication
    }
}

export type RequestableMentoring = Merge<Mentoring, {
    teacher: string;
}>

export interface NewMentoringProgram {
    endpoint: '/mentoring';
    method: 'POST';
    req: RequestableMentoring;
    res: {
        mentoring: Doc<Mentoring>
    }
}

export interface EditMentoringInfo {
    endpoint: '/mentoring/:id';
    method: 'PATCH';
    req: RequestableMentoring;
    res: {
        mentoring: Doc<Mentoring>
    }
}

export interface DeleteMentoringProgram {
    endpoint: '/mentoring/:id';
    method: 'DELETE';
    req: {};
    res: {
        mentoring: Doc<Mentoring>
    }
}
