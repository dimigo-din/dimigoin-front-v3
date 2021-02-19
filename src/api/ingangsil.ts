import { toast } from "react-toastify"
import { api } from "."
import { NightSelfStudyTime } from "../constants/types"

export const getMyIngangsilStatus = () =>
    api<"myIngangsilApplyStatus">("GET", "/ingang-application/status")


export const applyIngangsil = (time: NightSelfStudyTime) =>
    api<"applyIngangsil">("POST", "/ingang-application/time/" + time).then(() => toast.success(`인강실 ${time === 'NSS1' ? 1 : 2}타임을 신청했어요`))


export const unapplyIngangsil = (time: NightSelfStudyTime) =>
    api<"unapplyIngangsil">("DELETE", "/ingang-application/time/" + time).then(() => toast.info(`인강실 ${time === 'NSS1' ? 1 : 2}타임 신청을 취소했어요`))


export const requestExcelFile = (grade: number) =>
    api<"requestExcelFile">("GET", `/ingang-application/export/grade/${grade}`).then(e => e.exportedFile)
