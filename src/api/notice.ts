import { api } from "./api"

export const getAllNotices = () => {
    return api<"allNotices">("GET", "/notice").then(e => e.notices)
}
