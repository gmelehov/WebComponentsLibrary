export function isObject(value) {
    return value !== null && typeof value === 'object' && Array.isArray(value) === false;
}
