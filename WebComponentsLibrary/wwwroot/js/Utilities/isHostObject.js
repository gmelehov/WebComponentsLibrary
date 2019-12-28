/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @param value проверяемое значение
 */
export function isHostObject(value) {
    let result = false;
    if (value != null && typeof value.toString != 'function') {
        try {
            result = !!(value + '');
        }
        catch (e) {
        }
        ;
    }
    ;
    return result;
}
