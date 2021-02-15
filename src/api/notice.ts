import { Doc, Notice } from "../constants/types"
import { api } from "./api"

const convertToDatedNotice = (notice: Doc<Notice>) => ({
    ...notice,
    startDate: new Date(notice.startDate),
    endDate: new Date(notice.endDate),
})

export const getCurrentNotices = () => api<"currentNotices">("GET", "/notice").then(e => e.notices.map(convertToDatedNotice))

export const getAllNotices = (): Promise<Doc<Notice>[]> => api<"allNotices">("GET", "/notice").then(e => e.notices.map(convertToDatedNotice))

export const getNoticeById = (id: string): Promise<Doc<Notice>> => api<"getNoticeById">("GET", `/notice/${id}`).then(e => convertToDatedNotice(e.notice))

export const registerNewNotice = (data: Notice) => api<"registerNotice">("POST", "/notice", data)

export const removeNotice = (id: string) => api<"removeNotice">("DELETE", `/notice/${id}`).then(e => e.notice)
