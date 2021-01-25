import Cookies from 'universal-cookie';
import { AuthTokens } from '../constants/types';
import { api } from './api';
import { APIResource } from './serverResource';
import { getMyData } from './user';
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
} : APIResource['login']['req']) => {
    try {
        const res = await api<"login">('POST', '/auth', {
            password,
            username
        })
        setTokens(res)
        await getMyData()
        return true
    } catch(e) {
        return false
    }
}
