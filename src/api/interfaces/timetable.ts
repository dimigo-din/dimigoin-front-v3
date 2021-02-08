import { Grade } from "../../constants/types";

export interface Timetable {
    endpoint: "/timetable/weekly/grade/:grade/class/:class";
    method: "GET";
    req: {};
    res: {
        timetable: {
            sequence: string[];
            date: string;
            grade: Grade;
            class: number;
        }[];
    };
}