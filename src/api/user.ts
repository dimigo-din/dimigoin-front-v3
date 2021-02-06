import { COOKIE_JAR_KEY } from "../constants/cookieJarKeys"
import { Student } from "../constants/types"
import { cookieJar } from "../storage"
import { api } from "./api"

export const saveMyData = async (myData: Student) => {
    cookieJar.set(COOKIE_JAR_KEY.MY_INFO, myData)
}

export const getMyLocalData = () => cookieJar.get(COOKIE_JAR_KEY.MY_INFO) as Student | undefined

export const fetchMyData = async () => {
    const myData = await api<"getMyInfo">("GET", "/user/me")
    saveMyData(myData.identity)
    return myData.identity
}

export const getMyData = async () => {
    return getMyLocalData() || await fetchMyData()
}

export const fetchAllStudents = () => api<"getAllStudents">("GET", "/user/student").then(d => d.students)
export const getAllTeachers = () => api<"getAllTeachers">("GET", "/user/teacher").then(d => d.teachers)
