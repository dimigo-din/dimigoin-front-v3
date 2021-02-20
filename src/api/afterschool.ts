import { AfterschoolClass } from "../constants/types";
import { api } from "./api";

export const getAfterschoolClassList = () =>
    api<"afterschoolClassList">("GET", "/afterschool").then(e => e.afterschools)

export const editAfterschoolClassInfo = (classId: string, info: AfterschoolClass) =>
    api<"editAfterschoolClassInfo">("PATCH", `/afterschool/${classId}`, info).then(e => e.afterschool)
