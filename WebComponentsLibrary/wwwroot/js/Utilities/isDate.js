import { isObjectLike } from "./isObjectLike.js";
const dateTag = '[object Date]';
const objectProto = Object.prototype;
const objectToString = objectProto.toString;
/**
 * Проверяет, является ли значение value датой (имеет тип Date)
 * @param value проверяемое значение
 * @example
 *
 * isDate(new Date);   // => true
 * isDate('Mon April 23 2012');   // => false
 */
export function isDate(value) {
    return isObjectLike(value) && objectToString.call(value) === dateTag;
}
