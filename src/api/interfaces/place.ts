import { Doc, Place } from "../../constants/types";

export interface PrimaryPlaceList {
    method: 'GET';
    endpoint: '/place/primary';
    req: {};
    res: {
        places: Doc<Place>[]
    }
}