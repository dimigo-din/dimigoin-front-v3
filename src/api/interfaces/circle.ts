import { Circle } from "../../constants/types";

export interface AllCircle {
    endpoint: '/circle';
    method: 'GET';
    req: {};
    res: {
        circles: Circle[]
    }
}