import { api } from "./api";
import { ReqAfterschoolClass } from "./interfaces/afterschool";

export const getAfterschoolClassList = () =>
    api<"afterschoolClassList">("GET", "/afterschool").then(e => e.afterschools)

export const editAfterschoolClassInfo = (classId: string, info: ReqAfterschoolClass) =>
    api<"editAfterschoolClassInfo">("PATCH", `/afterschool/${classId}`, info).then(e => e.afterschool)

export const registerNewAfterschoolClass = (info: ReqAfterschoolClass) =>
    api<"registerNewAfterschoolClass">("POST", `/afterschool`, info).then(e => e.afterschool)

export const removeAfterschoolClass = (classId: string) =>
    api<"removeAfterschoolClass">("DELETE", `/afterschool/${classId}`).then(e => e.afterschool)

export const requestSheetByGrade = (grade: number) =>
    api<"requestSheetByGrade">("POST", `/afterschool-application/export/grade/${grade}`).then(e => e.exportedFile)

export const getAppliedClasses = () =>
    api<"appliedAfterschoolClasses">("GET", '/afterschool-application').then(e => e.applications)

export const applyAfterschoolClass = (classId: string) =>
    api<"applyAfterschoolClass">("POST", `/afterschool-application/${classId}`).then(e => e.afterschoolApplication)

export const unapplyAfterschoolClass = (classId: string) =>
    api<"unapplyAfterschoolClass">("DELETE", `/afterschool-application/${classId}`).then(e => e.afterschoolApplication)
