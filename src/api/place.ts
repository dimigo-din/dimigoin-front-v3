import { CacheKeys } from '../constants/cacheKey';
import { Doc, Place } from '../constants/types';
import { cacheItem, getCachedItem } from '../functions/localCache';
import { api } from './api';

let localCached: {
  [CacheKeys.PRIMARY_PLACE]: Doc<Place>[] | null;
  [CacheKeys.PLACES]: Doc<Place>[] | null;
} = {
  [CacheKeys.PRIMARY_PLACE]: null,
  [CacheKeys.PLACES]: null,
};

export const getPrimaryPlaceList = async () => {
  if (localCached[CacheKeys.PRIMARY_PLACE] !== null)
    return localCached[CacheKeys.PRIMARY_PLACE]!!;

  const storageCached = getCachedItem<Doc<Place>[]>(CacheKeys.PRIMARY_PLACE);
  if (storageCached) {
    localCached[CacheKeys.PRIMARY_PLACE] = storageCached;
    return storageCached;
  }
  try {
    const fetched = (await api<'primaryPlaceList'>('GET', '/place/primary'))
      .places;
    localCached[CacheKeys.PRIMARY_PLACE] = fetched;
    // 5일간 캐시
    cacheItem(
      CacheKeys.PRIMARY_PLACE,
      fetched,
      +new Date() + 1000 * 60 * 60 * 24 * 5,
    );
    return fetched;
  } catch (e) {
    throw e;
  }
};

const sortPlaces = <T extends Place>(places: T[]) => places.sort((a, b) =>
  a.name > b.name ? 1 : -1,
)

export const getPlaceList = async (): Promise<Doc<Place>[]> => {
  if (localCached[CacheKeys.PLACES] !== null)
    return sortPlaces(localCached[CacheKeys.PLACES]!!);

  const storageCached = getCachedItem<Doc<Place>[]>(CacheKeys.PLACES);
  if (storageCached) {
    localCached[CacheKeys.PLACES] = storageCached;
    return sortPlaces(storageCached);
  }

  const fetched = (await api<'placeList'>('GET', '/place')).places;
  localCached[CacheKeys.PLACES] = fetched;
  // 일주일간 캐시
  cacheItem(CacheKeys.PLACES, fetched, +new Date() + 1000 * 60 * 60 * 24 * 5);
  return sortPlaces(fetched);
};

export const getPlaceById = (placeId: number) =>
  getPlaceList().then((e) => e.find((p) => p.user_id === placeId));
