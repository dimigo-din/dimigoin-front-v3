import { Doc, AfterschoolClass, Merge } from "../../constants/types";

export type ReqAfterschoolClass = Merge<AfterschoolClass, {
    teacher: string;
    place: string;
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
