import { COOKIE_JAR_KEY } from "../constants/cookieJarKeys"
import { MyData } from "../constants/types"
import { cookieJar } from "../storage"
import { api } from "./api"

export const saveMyData = async (myData: MyData) => {
    cookieJar.set(COOKIE_JAR_KEY.MY_INFO, myData)
}

export const getMyData = async () => {
    const myData = await api<"getMyInfo">("GET", "/user/me")
    return myData.identity
}
