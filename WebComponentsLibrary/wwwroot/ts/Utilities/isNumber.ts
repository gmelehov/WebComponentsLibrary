import { isObjectLike } from "./isObjectLike.js";



const numberTag = '[object Number]';
const objectProto = Object.prototype;
const objectToString = objectProto.toString;




/**
 * Проверяет, является ли значение value числом (имеет тип number)
 * @param value проверяемое значение
 */
export function isNumber(value: any): boolean
{
	return typeof value === 'number' ||
		(isObjectLike(value) && objectToString.call(value) === numberTag);
}