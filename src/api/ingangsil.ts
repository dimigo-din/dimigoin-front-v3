import { api } from "."

export default {
    getMyStatus() {
        return api<"myIngangsilApplyStatus">("GET", "/ingang-application/status")
    },
    submit() {
        
    }
}
