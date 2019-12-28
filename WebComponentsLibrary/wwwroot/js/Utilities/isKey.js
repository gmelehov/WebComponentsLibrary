import { isSymbol } from "./isSymbol.js";
const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/, reIsPlainProp = /^\w*$/;
/**
 * Проверяет, является ли значение value именем свойства объекта и не property path
 * @param value проверяемое значение
 * @param object проверяемый объект
 */
export function isKey(value, object) {
    if (Array.isArray(value))
        return false;
    let type = typeof value;
    if (type === 'number' || type === 'symbol' || type === 'boolean' || value === null || isSymbol(value))
        return true;
    return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || (object !== null && value in Object(object));
}
