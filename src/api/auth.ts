import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';
import { post } from './api';
import { AuthTokens, PostResource } from './serverResource';
const cookieStorage = new Cookies()

enum STORAGE_KEY {
    ACCESS_TOKEN = "ACCESS_TOKEN",
    REFRESH_TOKEN = "REFRESH_TOKEN"
}

export const getToken = () => {
    return cookieStorage.get(STORAGE_KEY.ACCESS_TOKEN)
}

export const setTokens = (tokens: AuthTokens) => {
    cookieStorage.set(STORAGE_KEY.ACCESS_TOKEN, tokens.accessToken)
    cookieStorage.set(STORAGE_KEY.REFRESH_TOKEN, tokens.refreshToken)
}

export const clearTokens = () => {
    cookieStorage.remove(STORAGE_KEY.ACCESS_TOKEN)
    cookieStorage.remove(STORAGE_KEY.REFRESH_TOKEN)
}

export const loginWithInfo = async ({
    username,
    password
} : PostResource['login']['req']) => {
    try {
        const res = await post<"login">('/auth', {
            password,
            username
        })
        setTokens(res)
        return true
    } catch(e) {
        return false
    }
}