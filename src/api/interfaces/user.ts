import { Gender, UserType } from "../../constants/types"

export interface GetMyInfo {
    method: 'GET';
    endpoint: '/user/me';
    needAuth: true;
    req: {};
    res: {
        identity: {
            idx: number;
            username: string;
            name: string;
            userType: UserType;
            gender: Gender;
            createdAt: string;
            updatedAt: string;
            class: number;
            grade: number;
            number: number;
            serial: number;
            photo: string[];
        }
    };
}