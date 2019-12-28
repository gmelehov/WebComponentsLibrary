import { isUndefined } from './isUndefined.js';





/**
 * Проверяет, является ли значение value undefined или null
 * 
 * @param value проверяемое значение
 */
export function isNil(value: any): boolean
{
	return value === null || isUndefined(value);
}