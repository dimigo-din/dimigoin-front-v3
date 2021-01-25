import { COOKIE_JAR_KEY } from "../constants/cookieJarKeys"
import { MyData } from "../constants/types"
import { cookieJar } from "../storage"
import { api } from "./api"

export const saveMyData = async (myData: MyData) => {
    cookieJar.set(COOKIE_JAR_KEY.MY_INFO, myData)
}

export const getMyLocalData = () => cookieJar.get(COOKIE_JAR_KEY.MY_INFO) as MyData | undefined


export const fetchMyData = async () => {
    const myData = await api<"getMyInfo">("GET", "/user/me")
    return myData.identity
}
