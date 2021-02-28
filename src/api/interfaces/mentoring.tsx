import { Doc, DownloadbleFile, EngDay, Mentoring, MentoringApplication, MentoringSchedule, Merge } from "../../constants/types";

export interface MentoringList {
    endpoint: '/mentoring';
    method: 'GET';
    req: {};
    res: {
        mentorings: Doc<Mentoring>[];
    }
}

export interface AppliedMentoring {
    endpoint: '/mentoring-application';
    method: 'GET';
    req: {};
    res: {
        applications: Doc<MentoringApplication>[]
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
    endpoint: '/mentoring-application/:mentoringId/date/:YYYY-MM-DD';
    method: 'POST';
    req: {};
    res: {
        mentoringApplication: MentoringApplication
    }
}

export interface UnapplyMentoring {
    endpoint: '/mentoring-application/:mentoringId/date/:YYYY-MM-DD';
    method: 'DELETE';
    req: {};
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

export interface RequestMentoringApplyInfoSheet {
    endpoint: '/mentoring-application/export';
    method: 'POST';
    req: {};
    res: {
        exportedFile: DownloadbleFile
    }
}
