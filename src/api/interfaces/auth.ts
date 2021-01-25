import { AuthTokens } from "../../constants/types";

export interface Login {
    method: 'POST';
    endpoint: '/auth',
    req: {
        username: string;
        password: string;
    }
    res: AuthTokens
}