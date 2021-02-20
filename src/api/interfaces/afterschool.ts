import { Doc, AfterschoolClass } from "../../constants/types";

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
    req: AfterschoolClass;
    res: {
        afterschool: Doc<AfterschoolClass>
    }
}
