import { api } from "./api"

export const getMyData = async () => {
    console.log(await api<"getMyInfo">("GET", "/user/me"))
}
