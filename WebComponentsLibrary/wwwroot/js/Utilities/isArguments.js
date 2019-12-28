import { isArrayLikeObject } from './isArrayLikeObject.js';
const argsTag = '[object Arguments]';
const objectProto = Object.prototype;
const hasOwnProperty = objectProto.hasOwnProperty;
const objectToString = objectProto.toString;
const propertyIsEnumerable = objectProto.propertyIsEnumerable;
/**
 * Проверяет, является ли значение value похожим на аргумент
 *
 * @param value проверяемое значение
 */
export function isArguments(value) {
    return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
        (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}
