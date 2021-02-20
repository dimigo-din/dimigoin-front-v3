import { AfterschoolClass, Merge } from "../constants/types";
import { api } from "./api";
import { ReqAfterschoolClass } from "./interfaces/afterschool";

export const getAfterschoolClassList = () =>
    api<"afterschoolClassList">("GET", "/afterschool").then(e => e.afterschools)

export const editAfterschoolClassInfo = (classId: string, info: ReqAfterschoolClass) =>
    api<"editAfterschoolClassInfo">("PATCH", `/afterschool/${classId}`, info).then(e => e.afterschool)

export const registerNewAfterschoolClass = (info: ReqAfterschoolClass) =>
    api<"registerNewAfterschoolClass">("POST", `/afterschool`, info).then(e => e.afterschool)
