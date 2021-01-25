
import { COOKIE_JAR_KEY } from '../constants/cookieJarKeys';
import { AuthTokens } from '../constants/types';
import { cookieJar } from '../storage';
import { api } from './api';
import { APIResource } from './serverResource';
import { getMyData, saveMyData } from './user';

export const getToken = () => {
    return cookieJar.get(COOKIE_JAR_KEY.ACCESS_TOKEN)
}

export const setTokens = (tokens: AuthTokens) => {
    cookieJar.set(COOKIE_JAR_KEY.ACCESS_TOKEN, tokens.accessToken)
    cookieJar.set(COOKIE_JAR_KEY.REFRESH_TOKEN, tokens.refreshToken)
}

export const clearTokens = () => {
    cookieJar.remove(COOKIE_JAR_KEY.ACCESS_TOKEN)
    cookieJar.remove(COOKIE_JAR_KEY.REFRESH_TOKEN)
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
        saveMyData(await getMyData())
        return true
    } catch(e) {
        return false
    }
}
