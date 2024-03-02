export interface CacheValueGetter<T> {
  (): Promise<T>;
}

export function cache<T>(
  ttlMilliseconds: number,
  getValue: CacheValueGetter<T>,
): CacheValueGetter<T> {
  let isUpdating = false;
  let cachedValue: Promise<T> | null = null;
  let updatedAt: number = 0;

  async function updateCachedValue() {
    isUpdating = true;
    try {
      cachedValue = getValue();
      return await cachedValue;
    } finally {
      updatedAt = Date.now();
      isUpdating = false;
    }
  }

  return () => {
    const diff = Date.now() - updatedAt;
    const isFresh =
      cachedValue !== null && diff < ttlMilliseconds && !isUpdating;

    // TypeScript doesn't detect the `cachedValue !== null` in `isExpired`, so
    // it needs to be explicitly added to the `if` condition.
    //
    // FIXME: Remove `cachedValue !== null` from this `if` when TypeScript
    // stops complaining.
    if (isFresh && cachedValue !== null) {
      return cachedValue;
    } else {
      return updateCachedValue();
    }
  };
}
