import { isLength } from './isLength.js';
import { isFunction } from './isFunction.js';







/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 * 
 * @param value проверяемое значение
 */
export function isArrayLike(value: any): boolean
{
	return value != null && isLength(value && value.length) && !isFunction(value);
}