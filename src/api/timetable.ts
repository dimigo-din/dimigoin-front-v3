import { Grade } from "../constants/types"
import { api } from "./api"

export const getTimetable = (grade: Grade, clas: number) => 
    api<"timetable">("GET", `/timetable/weekly/grade/${grade}/class/${clas}`).then(e => e.timetable)
