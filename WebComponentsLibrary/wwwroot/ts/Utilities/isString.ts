import { isObjectLike } from "./isObjectLike.js";



const stringTag = '[object String]';
const objectProto = Object.prototype;
const objectToString = objectProto.toString;





/**
 * Проверяет, является ли значение value строкой
 * @param value проверяемое значение
 */
export function isString(value: any): boolean
{
	return typeof value === 'string' ||
		(!Array.isArray(value) && isObjectLike(value) && objectToString.call(value) === stringTag);
}