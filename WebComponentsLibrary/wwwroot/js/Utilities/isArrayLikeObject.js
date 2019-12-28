import { isObjectLike } from './isObjectLike.js';
import { isArrayLike } from './isArrayLike.js';
/**
 * Метод, аналогичный isArrayLike.
 * Дополнительно производится проверка, является ли значение value объектом.
 *
 * @param value проверяемое значение
 */
export function isArrayLikeObject(value) {
    return isObjectLike(value) && isArrayLike(value);
}
