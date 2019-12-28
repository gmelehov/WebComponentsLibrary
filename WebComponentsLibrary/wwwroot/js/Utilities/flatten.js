import { baseFlatten } from './baseFlatten.js';
import { toInteger } from './toInteger.js';
/**
 * Flattens `array` a single level deep.
 *
 * @param array исходный массив
 * @param depth глубина обработки массива
 */
export function flatten(array, depth = 1) {
    const length = array ? array.length : 0;
    if (!length)
        return [];
    depth = depth === undefined ? 1 : toInteger(depth);
    return baseFlatten(array, depth);
}
