import { Doc, AfterschoolClass, Merge, DownloadbleFile, AfterschoolClassApplication } from "../../constants/types";

export type ReqAfterschoolClass = Merge<AfterschoolClass, {
    teacher: string;
    place: string;
    applierCount?: number;
}>

export interface AfterschoolList {
    endpoint: '/afterschool';
    method: 'GET';
    req: {};
    res: {
        afterschools: Doc<AfterschoolClass>[]
    }
}

export interface EditAfterschoolClassInfo {
    endpoint: '/afterschool/:id';
    method: 'PATCH';
    req: ReqAfterschoolClass;
    res: {
        afterschool: Doc<AfterschoolClass>
    }
}

export interface RegisterNewAfterschoolClass {
    endpoint: '/afterschool';
    method: 'POST';
    req: ReqAfterschoolClass;
    res: {
        afterschool: Doc<AfterschoolClass>
    }
}

export interface RequestSheetByGrade {
    endpoint: '/afterschool-application/export/grade/:grade';
    method: 'POST';
    req: {};
    res: {
        exportedFile: DownloadbleFile
    }
}

export interface AppliedAfterschoolClasses {
    endpoint: '/afterschool-application',
    method: 'GET',
    req: {};
    res: {
        applications: Doc<AfterschoolClassApplication>[]
    }
}

export interface ApplyAfterschoolClass {
    endpoint: '/afterschool-application/:afterschoolId';
    method: 'POST';
    req: {};
    res: {
        afterschoolApplication: Doc<AfterschoolClassApplication>
    }
}

export interface UnapplyAfterschoolClass {
    endpoint: '/afterschool-application/:afterschoolId';
    method: 'DELETE';
    req: {};
    res: {
        afterschoolApplication: Doc<AfterschoolClassApplication>
    }
}

