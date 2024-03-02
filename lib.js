"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cache = void 0;
function cache(ttlMilliseconds, getValue) {
    let isUpdating = false;
    let cachedValue = null;
    let updatedAt = 0;
    async function updateCachedValue() {
        isUpdating = true;
        try {
            cachedValue = getValue();
            return await cachedValue;
        }
        catch (err) {
            cachedValue = null;
            throw err;
        }
        finally {
            updatedAt = Date.now();
            isUpdating = false;
        }
    }
    return () => {
        const diff = Date.now() - updatedAt;
        const isFresh = cachedValue !== null && diff < ttlMilliseconds && !isUpdating;
        // TypeScript doesn't detect the `cachedValue !== null` in `isExpired`, so
        // it needs to be explicitly added to the `if` condition.
        //
        // FIXME: Remove `cachedValue !== null` from this `if` when TypeScript
        // stops complaining.
        if (isFresh && cachedValue !== null) {
            return cachedValue;
        }
        else {
            return updateCachedValue();
        }
    };
}
exports.cache = cache;
