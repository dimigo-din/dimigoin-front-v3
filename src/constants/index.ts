export const days = ["월", "화", "수", "목", "금", "토", "일"];
export const dayEngKorMapper = {
    "mon": "월",
    "tue": "화",
    "wed": "수",
    "thu": "목",
    "fri": "금",
    "sat": "토",
    "sun": "일"
}
export const SCHOOL_API_SERVER = process.env.REACT_APP_SCHOOL_API_SERVER || (() => {
    throw new Error("Cannot find School API Server URI (Student Database)")
})()
