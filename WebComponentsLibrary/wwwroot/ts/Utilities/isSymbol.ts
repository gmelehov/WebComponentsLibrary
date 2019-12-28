import { isObjectLike } from "./isObjectLike.js";
import { getTag, enumTags } from "./getTag.js";






/**
 * Проверяет, является ли значение value значением типа Symbol
 * @param value проверяемое значение
 */
export function isSymbol(value: any): boolean
{
	return typeof value === 'symbol' ||
		(isObjectLike(value) && getTag(value) === enumTags.symbolTag);
}