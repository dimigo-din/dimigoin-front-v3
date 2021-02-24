import { api } from "./api";
import { cacheItem, getCachedItem } from "../functions/localCache";
import { CacheKeys } from "../constants/cacheKey";
import { Doc, CircleApplyQuestionItem } from "../constants/types";

export const getAllCircles = () =>
    api<"allCircle">("GET", "/circle").then(e => e.circles)

export const getAppliedCircles = () =>
    api<"appliedCircle">("GET", "/circle-application")

export const getApplyQuestion = async () => {
    const cached = getCachedItem<Doc<CircleApplyQuestionItem>[]>(CacheKeys.CIRCLE_APPLY_QUESTION)
    if(cached) return cached
    const fetched = (await api<"applyQuestion">("GET", "/circle-application/form")).form
    cacheItem(CacheKeys.CIRCLE_APPLY_QUESTION, fetched, +new Date() + 1000 * 60 * 60 * 24 * 3)
    return fetched
}
