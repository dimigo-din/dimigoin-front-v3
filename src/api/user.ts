import { COOKIE_JAR_KEY } from "../constants/cookieJarKeys"
import { User } from "../constants/types"
import { cookieJar } from "../storage"
import { api } from "./api"
import { getAccessToken } from "./auth"

export const saveMyData = async (myData: User) => {
    cookieJar.set(COOKIE_JAR_KEY.MY_INFO, myData)
}

export const getMyLocalData = () => cookieJar.get(COOKIE_JAR_KEY.MY_INFO) as User | undefined

export const fetchMyData = async () => {
    if(!getAccessToken()) {
        throw new Error("No Auth Data")
    }
    const myData = await api<"getMyInfo">("GET", "/user/me")
    saveMyData(myData.identity)
    return myData.identity
}

export const getMyData = () => {
    const cached = getMyLocalData()
    if(cached) return Promise.resolve(cached)
    else return fetchMyData()
}

export const fetchAllStudents = () => api<"getAllStudents">("GET", "/user/student").then(d => d.students)
export const getAllTeachers = () => api<"getAllTeachers">("GET", "/user/teacher").then(d => d.teachers)
