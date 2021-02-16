import { CacheKeys } from "../constants/cacheKey";
import { Doc, Place } from "../constants/types";
import { cacheItem, getCachedItem } from "../functions/localCache";
import { api } from "./api";

export const getPrimaryPlaceList = async () => {
    const cached = getCachedItem<Doc<Place>[]>(CacheKeys.PRIMARY_PLACE)
    if(cached) return cached
    const fetched = (await api<"primaryPlaceList">("GET", "/place/primary")).places
    // 일주일 캐시
    cacheItem(CacheKeys.PRIMARY_PLACE, fetched, +new Date() + 1000 * 60 * 60 * 24 * 5)
    return fetched
}