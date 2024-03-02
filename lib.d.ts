export interface CacheValueGetter<T> {
    (): Promise<T>;
}
export declare function cache<T>(ttlMilliseconds: number, getValue: CacheValueGetter<T>): CacheValueGetter<T>;
