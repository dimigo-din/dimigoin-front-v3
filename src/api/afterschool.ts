import { api } from "./api";

export const getAfterschoolClassList = () =>
    api<"afterschoolClassList">("GET", "/afterschool").then(e => e.afterschools)