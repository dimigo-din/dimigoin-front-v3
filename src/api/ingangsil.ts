import { api } from "."
import { NightSelfStudyTime } from "../constants/types"

export default {
    getMyStatus() {
        return api<"myIngangsilApplyStatus">("GET", "/ingang-application/status")
    },
    apply(time: NightSelfStudyTime) {
        return api<"applyIngangsil">("POST", "/ingang-application/time/" + time)
    },
    unapply(time: NightSelfStudyTime) {
        return api<"unapplyIngangsil">("DELETE", "/ingang-application/time/" + time)
    }
}
