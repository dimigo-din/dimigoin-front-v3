import { Student, User } from "../constants/types";

export const isStudent = (user: User): user is Student => (user as any).grade !== undefined
