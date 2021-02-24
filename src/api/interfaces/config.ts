import { ServiceConfig } from "../../constants/types";

export interface Config {
    method: 'GET';
    endpoint: '/config';
    req: {};
    res: {
        config: ServiceConfig
    }
}
