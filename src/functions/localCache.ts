interface Cache<DataType> {
  expiryStamp: number;
  data: DataType;
}

export const getCachedItem = <ItemType>(name: string): ItemType | null => {
  const cache = localStorage.getItem(name);
  if (!cache) return null;
  const parsedCache: Cache<ItemType> = JSON.parse(cache);
  if (parsedCache.expiryStamp < +new Date()) return null;
  return parsedCache.data;
};

export const cacheItem = <ItemType>(
  name: string,
  data: ItemType,
  expiryStamp: number,
) => {
  localStorage.setItem(
    name,
    JSON.stringify({
      data,
      expiryStamp,
    }),
  );
};
