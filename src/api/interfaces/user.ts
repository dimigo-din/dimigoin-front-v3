import { MyData } from "../../constants/types"

export interface GetMyInfo {
    method: 'GET';
    endpoint: '/user/me';
    needAuth: true;
    req: {};
    res: {
        identity: MyData
    };
}