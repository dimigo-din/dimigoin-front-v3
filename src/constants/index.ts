export const days = ["월", "화", "수", "목", "금", "토", "일"];
export const SCHOOL_API_SERVER = process.env.REACT_APP_SCHOOL_API_SERVER || (() => {
    throw new Error("Cannot find School API Server URI (Student Database)")
})()
