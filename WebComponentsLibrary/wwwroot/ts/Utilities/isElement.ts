import { isObjectLike } from './isObjectLike.js';
import { isPlainObject } from './isPlainObject.js';





/**
 * Проверяет, может ли значение value являться DOM-элементом
 * @param value проверяемое значение
 * @returns {Boolean}
 */
export function isElement(value: any): boolean
{
	return !!value && value.nodeType === 1 && isObjectLike(value) && !isPlainObject(value);
}