import Cookies from 'universal-cookie';
import { post } from './api';
import { PostResource } from './serverResource';
const cookieStorage = new Cookies()

enum STORAGE_KEY {
    ACCESS_TOKEN = "ACCESS_TOKEN",
    REFRESH_TOKEN = "REFRESH_TOKEN"
}

export const getToken = () => {
    return cookieStorage.get(STORAGE_KEY.ACCESS_TOKEN)
}

export const loginWithInfo = ({
    username,
    password
} : PostResource['login']['req']) => {
    post<"login">("login", {
        password,
        username
    })
}
