import { toast } from "react-toastify"
import { api } from "."
import { NightSelfStudyTime } from "../constants/types"

export default {
    getMyStatus() {
        return api<"myIngangsilApplyStatus">("GET", "/ingang-application/status")
    },
    apply(time: NightSelfStudyTime) {
        return api<"applyIngangsil">("POST", "/ingang-application/time/" + time).then(() => toast.success(`인강실 ${time === 'NSS1' ? 1 : 2}타임을 신청했어요`))
    },
    unapply(time: NightSelfStudyTime) {
        return api<"unapplyIngangsil">("DELETE", "/ingang-application/time/" + time).then(() => toast.info(`인강실 ${time === 'NSS1' ? 1 : 2}타임 신청을 취소했어요`))
    }
}
