/**
 * Логический оператор XNOR.
 *
 * @param a первый операнд
 * @param b второй операнд
 * @returns {Boolean}
 */
export function xnor(a, b) {
    return Boolean(a) === Boolean(b);
}
